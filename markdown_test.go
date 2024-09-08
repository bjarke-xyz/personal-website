package main

import (
	"reflect"
	"testing"
	"time"
)

func TestMarkdownToHTML(t *testing.T) {
	input := `---
title: Hello world
description: This is the hello world post
tags: hello, world, test
date: 2024-09-07 10:28 +0200
	---

# Hello world

Hello world.

## Hello again

Hello *world*, **again**..

this text is ***bold and italic***

Click [here](https://example.org)
	`
	metadata, html, err := MarkdownToHTML(input)
	if err != nil {
		t.Fatalf("error in MarkdownToHTML: %v", err)
	}

	expectedDate, err := time.Parse("2006-01-02 15:04 -0700", "2024-09-07 10:28 +0200")
	if err != nil {
		t.Fatalf("error parsing expected date: %v", err)
	}
	expectedMetadata := MarkdownMetadata{
		Title:       "Hello world",
		Description: "This is the hello world post",
		Tags:        []string{"hello", "world", "test"},
		Date:        expectedDate,
	}
	if !reflect.DeepEqual(metadata, expectedMetadata) {
		t.Fatalf("error in metadata: got %+v, want %+v", metadata, expectedMetadata)
	}

	expectedHtml := `<h1>Hello world</h1>
<p>Hello world.</p>
<h2>Hello again</h2>
<p>Hello <em>world</em>, <strong>again</strong>..</p>
<p>this text is <em><strong>bold and italic</strong></em></p>
<p>Click <a href="https://example.org">here</a></p>`
	if html != expectedHtml {
		t.Fatalf("error in html: got '%v', want '%v'", html, expectedHtml)
	}
}
