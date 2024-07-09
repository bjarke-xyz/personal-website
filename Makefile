.PHONY: clean gobuild build serve

gobuild:
	go build -o pw

cleangobuild:
	rm pw

clean:
	rm -rf output/*
	touch output/.gitkeep

build: clean gobuild
	./pw --command build --verbose

serve: gobuild
	./pw --command serve --verbose

buildAndServe: clean gobuild
	./pw --command buildAndServe --verbose

clean-thumbnails:
	rm -f ./assets/img/projects/thumb-*

thumbnails: clean-thumbnails
	./scripts/create_thumbnails.sh