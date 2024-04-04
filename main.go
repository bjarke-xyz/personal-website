package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"text/template"
)

const outputDir = "output"
const templateDir = "./templates/"

type Page struct {
	template *template.Template
	data     any
}

type PageData struct {
	Title string
}

var pages = map[string]*Page{
	"index.html":    parsePage("index.html", PageData{Title: "Index!!"}),
	"projects.html": parsePage("projects.html", PageData{Title: "projects :)"}),
}

func main() {
	for k, v := range pages {
		fullFilepath := fmt.Sprintf("%s/%s", outputDir, k)
		filepathBase := filepath.Dir(fullFilepath)

		if _, err := os.Stat(filepathBase); os.IsNotExist(err) {
			if err := os.MkdirAll(outputDir, os.ModePerm); err != nil {
				log.Fatal(err)
				return
			}
		}

		outputFile, err := os.Create(fullFilepath)
		if err != nil {
			log.Fatal(outputFile)
			return
		}
		defer outputFile.Close()
		err = v.template.ExecuteTemplate(outputFile, "base", v.data)
		if err != nil {
			log.Fatal(err)
			return
		}
	}

	fmt.Println("Template executed successfully")
}

func parsePage(file string, data any) *Page {
	filenames := []string{file, "base.html"}
	templateFiles := make([]string, len(filenames))
	for i, f := range filenames {
		templateFiles[i] = fmt.Sprintf("%s/%s", templateDir, f)
	}

	tmpl, err := template.New("").ParseFiles(templateFiles...)
	if err != nil {
		log.Fatal(err)
	}
	page := &Page{
		template: tmpl,
		data:     data,
	}
	return page
}
