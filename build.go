package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
	"path/filepath"
	"text/template"
	"time"
)

type Page struct {
	template *template.Template
	data     any
}

type PageData struct {
	Title string
}

type ProjectsData struct {
	PageData
	Projects []Project
}

var pages = map[string]*Page{
	"/":          parsePage("index.html", PageData{Title: "Hi 👋 | Bjarke"}),
	"/projects/": parsePage("projects.html", ProjectsData{PageData: PageData{Title: "Projects | Bjarke"}, Projects: mustLoadProjects()}),
	"/contact/":  parsePage("contact.html", PageData{Title: "Contact | Bjarke"}),
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

func build() error {
	for k, v := range pages {
		hasExt := filepath.Ext(k) != ""
		fullFilepath := fmt.Sprintf("%s%s", outputDir, k)
		if !hasExt {
			fullFilepath = fmt.Sprintf("%s%sindex.html", outputDir, k)
		}
		filepathBase := filepath.Dir(fullFilepath)

		if _, err := os.Stat(filepathBase); os.IsNotExist(err) {
			if err := os.MkdirAll(filepathBase, os.ModePerm); err != nil {
				return fmt.Errorf("failed to mkdirAll: %w", err)
			}
		}

		outputFile, err := os.Create(fullFilepath)
		if err != nil {
			return fmt.Errorf("failed to create file path %v: %w", fullFilepath, err)
		}
		defer outputFile.Close()
		err = v.template.ExecuteTemplate(outputFile, "base", v.data)
		if err != nil {
			return fmt.Errorf("failed to execute template: %w", err)
		}
	}

	return nil
}

type Projects struct {
	Websites []Project `json:"websites"`
}

type Project struct {
	Description string          `json:"description"`
	Disabled    bool            `json:"disabled"`
	Images      []ProjectImages `json:"images"`
	Dates       ProjectDates    `json:"dates"`
	Name        string          `json:"name"`
	Urls        ProjectUrls     `json:"urls"`
}
type ProjectUrls struct {
	Main   string `json:"main"`
	Github string `json:"github"`
}
type ProjectDates struct {
	From time.Time  `json:"from"`
	To   *time.Time `json:"to"`
}
type ProjectImages struct {
	File   string `json:"file"`
	Width  int    `json:"width"`
	Height int    `json:"height"`
	Alt    string `json:"alt"`
}

func mustLoadProjects() []Project {
	projects := &Projects{}
	projectsFile, err := os.Open("./data/projects.json")
	if err != nil {
		log.Fatalf("failed to open projects file: %v", err)
		return projects.Websites
	}
	projectsBytes, err := io.ReadAll(projectsFile)
	if err != nil {
		log.Fatalf("failed to read projects file: %v", err)
		return projects.Websites
	}
	err = json.Unmarshal(projectsBytes, &projects)
	if err != nil {
		log.Fatalf("failed to unmarshal project to json: %v", err)
		return projects.Websites
	}
	return projects.Websites
}
