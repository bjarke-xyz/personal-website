package main

import (
	"fmt"
	"log"
	"os"
	"strings"
)

const outputDir = "output"
const templateDir = "./templates/"

const port = 3000

func main() {
	if len(os.Args) < 2 {
		fmt.Printf("commands: build, serve, buildandserve\n")
		return
	}
	var err error
	cmd := strings.ToLower(os.Args[1])
	switch cmd {
	case "build":
		err = build()
	case "serve":
		err = serve(port)
	case "buildandserve":
		err = build()
		if err == nil {
			err = serve(port)
		}
	default:
		fmt.Println("unknown command")
	}
	if err != nil {
		log.Fatalf("%s failed: %v", cmd, err)
	}
}
