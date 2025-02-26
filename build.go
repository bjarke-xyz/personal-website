package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
	"path"
	"path/filepath"
	"text/template"
	"time"
)

type Page struct {
	template *template.Template
	data     any
}

type PostPage struct {
	*Page
	Path string
	Name string
}

type PageData struct {
	Title string
}

type ProjectsData struct {
	PageData
	Projects []Project
}

type PostsData struct {
	PageData
	Posts []*PostPage
}

func mustParsePage(file string, data any) *Page {
	page, err := parsePage(file, data)
	if err != nil {
		log.Fatalf("failed to parse page: %v", err)
	}
	return page
}
func parsePage(file string, data any) (*Page, error) {
	filenames := []string{file, "base.html"}
	templateFiles := make([]string, len(filenames))
	for i, f := range filenames {
		templateFiles[i] = fmt.Sprintf("%s/%s", templateDir, f)
	}

	tmpl, err := template.New("").ParseFiles(templateFiles...)
	if err != nil {
		return nil, fmt.Errorf("error parsing template files %v: %w", file, err)
	}
	page := &Page{
		template: tmpl,
		data:     data,
	}
	return page, nil
}

func buildRoutes() map[string]*Page {
	postsPages := mustLoadPosts()
	var pages = map[string]*Page{
		"/":          mustParsePage("index.html", PageData{Title: "Hi 👋 | Bjarke"}),
		"/projects/": mustParsePage("projects.html", ProjectsData{PageData: PageData{Title: "Projects | Bjarke"}, Projects: mustLoadProjects()}),
		"/contact/":  mustParsePage("contact.html", PageData{Title: "Contact | Bjarke"}),
		"/posts/":    mustParsePage("posts.html", PostsData{PageData: PageData{Title: "Posts | Bjarke"}, Posts: postsPages}),
	}
	for _, p := range postsPages {
		pages[p.Path] = p.Page
	}

	return pages
}

func build(verbose bool) error {
	pages := buildRoutes()
	for k, v := range pages {
		hasExt := filepath.Ext(k) != ""
		fullFilepath := path.Join(outputDir, k)
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
		if verbose {
			log.Printf("Created file %v", outputFile.Name())
		}
	}

	err := copyDir("./public", "./output", verbose)
	if err != nil {
		return fmt.Errorf("error copying public directory: %w", err)
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

func loadProjects() ([]Project, error) {
	projects := &Projects{}
	projectsFile, err := os.Open("./data/projects.json")
	if err != nil {
		return projects.Websites, fmt.Errorf("failed to open projects file: %w", err)
	}
	projectsBytes, err := io.ReadAll(projectsFile)
	if err != nil {
		return projects.Websites, fmt.Errorf("failed to read projects file: %w", err)
	}
	err = json.Unmarshal(projectsBytes, &projects)
	if err != nil {
		return projects.Websites, fmt.Errorf("failed to unmarshal project to json: %v", err)
	}
	websites := make([]Project, 0, len(projects.Websites))
	for _, website := range projects.Websites {
		if !website.Disabled {
			websites = append(websites, website)
		}
	}
	return websites, nil
}
func mustLoadProjects() []Project {
	projects, err := loadProjects()
	if err != nil {
		log.Fatalf("failed to load projects: %v", err)
	}
	return projects
}

func mustLoadPosts() []*PostPage {
	postPages, err := loadPosts()
	if err != nil {
		log.Fatalf("failed to load posts: %v", err)
	}
	return postPages
}
func loadPosts() ([]*PostPage, error) {
	postPages := make([]*PostPage, 0)
	entries, err := os.ReadDir("./templates/posts")
	if err != nil {
		return postPages, fmt.Errorf("failed to read posts dir: %w", err)
	}

	for _, entry := range entries {
		name := entry.Name()
		pagePath := "posts/" + name
		page, err := parsePage(pagePath, nil)
		if err != nil {
			return postPages, fmt.Errorf("failed to parse page %v: %w", pagePath, err)
		}
		postPage := &PostPage{
			Page: page,
			Path: pagePath,
			Name: name,
		}
		postPages = append(postPages, postPage)
	}
	return postPages, nil
}

func copyDir(srcDir string, destDir string, verbose bool) error {
	srcDirEntries, err := os.ReadDir(srcDir)
	if err != nil {
		return fmt.Errorf("error reading dir of %v: %w", srcDir, err)
	}
	for _, entry := range srcDirEntries {
		if entry.IsDir() {
			newSrcDir := path.Join(srcDir, entry.Name())
			newDestDir := path.Join(destDir, entry.Name())
			if _, err := os.Stat(newDestDir); os.IsNotExist(err) {
				err = os.MkdirAll(newDestDir, 0755)
				if err != nil {
					return fmt.Errorf("error creating dir at %v: %w", newDestDir, err)
				}
			}
			err = copyDir(newSrcDir, newDestDir, verbose)
			if err != nil {
				return fmt.Errorf("error copying dir %v: %w", newSrcDir, err)
			}
		} else {
			destPath := filepath.Join(destDir, entry.Name())
			srcPath := filepath.Join(srcDir, entry.Name())
			srcFile, err := os.Open(srcPath)
			if err != nil {
				return fmt.Errorf("error opening src file at %v: %w", srcPath, err)
			}
			defer srcFile.Close()
			destFile, err := os.Create(destPath)
			if err != nil {
				return fmt.Errorf("error creating dest file at %v: %w", destPath, err)
			}
			defer destFile.Close()
			_, err = io.Copy(destFile, srcFile)
			if err != nil {
				return fmt.Errorf("error writing to dest file %v: %w", destPath, err)
			}
			if verbose {
				log.Printf("Copied file to %v", destPath)
			}
		}
	}
	return nil
}
