package main

import (
	"fmt"
	"log"
	"net/http"
)

func serve(port int) error {
	mux := http.NewServeMux()
	fs := http.FileServer(http.Dir(outputDir))
	mux.Handle("/", fs)
	log.Printf("listening on http://localhost:%d", port)
	return http.ListenAndServe(fmt.Sprintf(":%d", port), mux)
}
