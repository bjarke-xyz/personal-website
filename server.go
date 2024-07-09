package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

func serve(port int, verbose bool) error {
	mux := http.NewServeMux()
	fs := http.FileServer(http.Dir(outputDir))
	mux.Handle("/", fs)
	var handler http.Handler = mux
	if verbose {
		handler = loggingMiddleware(mux)
	}
	log.Printf("listening on http://localhost:%d", port)
	return http.ListenAndServe(fmt.Sprintf(":%d", port), handler)
}

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		// Call the next handler
		next.ServeHTTP(w, r)

		// Log request details in a single line
		log.Printf("%s %s %s %v", r.RemoteAddr, r.Method, r.URL.Path, time.Since(start))
	})
}
