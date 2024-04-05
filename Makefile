.PHONY: clean gobuild build serve

gobuild:
	go build -o pw

cleangobuild:
	rm pw

clean:
	rm -rf output/*
	touch output/.gitkeep

build: clean gobuild
	./pw build
	cp _headers output

serve: gobuild
	./pw serve

buildAndServe: clean gobuild
	./pw buildAndServe