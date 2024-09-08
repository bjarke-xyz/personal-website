package main

import (
	"fmt"
	"regexp"
	"strings"
	"time"
)

type MarkdownMetadata struct {
	Title       string
	Description string
	Tags        []string
	Date        time.Time
}

// MarkdownToHTML converts a markdown string with optional frontmatter to metadata and html
func MarkdownToHTML(input string) (MarkdownMetadata, string, error) {
	var metadata MarkdownMetadata
	var markdown string
	var err error

	if strings.HasPrefix(input, "---") {
		metadata, markdown, err = parseFrontmatter(input)
		if err != nil {
			return metadata, markdown, fmt.Errorf("error converting markdown to html: %w", err)
		}
	} else {
		markdown = input
	}

	html := parseMarkdown(markdown)

	return metadata, html, nil
}

func parseMarkdown(input string) string {
	lines := strings.Split(input, "\n")

	buffer := &strings.Builder{}

	for _, line := range lines {
		line = parseHeaders(buffer, line)
		_ = parseParagraph(buffer, line)
	}
	return strings.TrimSpace(buffer.String())
}

func parseParagraph(buffer *strings.Builder, line string) string {
	if strings.TrimSpace(line) == "" {
		return line
	}
	line = parseInlineFormatting(line)
	buffer.WriteString(fmt.Sprintf("<p>%s</p>\n", line))
	return ""
}

func parseInlineFormatting(line string) string {
	line = parseBoldItalic(line)
	line = parseLink(line)
	return line
}

var boldItalicRegex = regexp.MustCompile(`\*\*\*(.*?)\*\*\*`)
var boldRegex = regexp.MustCompile(`\*\*(.*?)\*\*`)
var italicRegex = regexp.MustCompile(`\*(.*?)\*`)

func parseBoldItalic(line string) string {
	line = boldItalicRegex.ReplaceAllString(line, "<em><strong>$1</strong></em>")
	line = boldRegex.ReplaceAllString(line, "<strong>$1</strong>")
	line = italicRegex.ReplaceAllString(line, "<em>$1</em>")
	return line
}

var linkRegex = regexp.MustCompile(`\[(.*?)\]\((.*?)\)`)

func parseLink(line string) string {
	return linkRegex.ReplaceAllString(line, `<a href="$2">$1</a>`)
}

func parseHeaders(buffer *strings.Builder, line string) string {
	switch {
	case strings.HasPrefix(line, "# "):
		buffer.WriteString(parseHeader(line, 1))
	case strings.HasPrefix(line, "## "):
		buffer.WriteString(parseHeader(line, 2))
	case strings.HasPrefix(line, "### "):
		buffer.WriteString(parseHeader(line, 3))
	case strings.HasPrefix(line, "#### "):
		buffer.WriteString(parseHeader(line, 4))
	case strings.HasPrefix(line, "##### "):
		buffer.WriteString(parseHeader(line, 5))
	case strings.HasPrefix(line, "###### "):
		buffer.WriteString(parseHeader(line, 6))
	default:
		return line
	}
	return ""
}
func parseHeader(line string, level int) string {
	content := strings.TrimSpace(line[level+1:])
	return fmt.Sprintf("<h%d>%s</h%d>\n", level, content, level)
}

func parseFrontmatter(input string) (MarkdownMetadata, string, error) {
	parts := strings.SplitN(input, "---", 3)
	metaPart := parts[1]
	markdown := parts[2]

	metaLines := strings.Split(metaPart, "\n")
	var metadata MarkdownMetadata
	var err error
	for _, line := range metaLines {
		if line == "" {
			continue
		}
		lineParts := strings.Split(line, ":")
		key := lineParts[0]
		val := strings.TrimSpace(strings.Join(lineParts[1:], ":"))

		switch key {
		case "title":
			metadata.Title = val
		case "description":
			metadata.Description = val
		case "tags":
			tags := strings.Split(val, ",")
			for i := range tags {
				tags[i] = strings.TrimSpace(tags[i])
			}
			metadata.Tags = tags
		case "date":
			metadata.Date, err = time.Parse("2006-01-02 15:04 -0700", val)
			if err != nil {
				return metadata, "", fmt.Errorf("error parsing frontmatter date '%v': %w", val, err)
			}
		}
	}
	return metadata, markdown, nil
}
