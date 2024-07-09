package main

import (
	"flag"
	"fmt"
	"log"
	"strings"
)

const outputDir = "output"
const templateDir = "./templates/"

const port = 3000

func main() {
	cmd := ""
	verbose := false
	flag.StringVar(&cmd, "command", "", "Command to run. Options are: build, serve, buildAndServe")
	flag.BoolVar(&verbose, "verbose", false, "Verbose output")
	flag.Parse()

	cmd = strings.ToLower(cmd)
	var err error
	switch cmd {
	case "build":
		err = build(verbose)
	case "serve":
		err = serve(port, verbose)
	case "buildandserve":
		err = build(verbose)
		if err == nil {
			err = serve(port, verbose)
		}
	default:
		fmt.Println("unknown command")
	}
	if err != nil {
		log.Fatalf("%s failed: %v", cmd, err)
	}
}
