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
	cp -r public/* output

serve: gobuild
	./pw serve

buildAndServe: clean gobuild
	./pw buildAndServe

clean-thumbnails:
	rm -f ./assets/img/projects/thumb-*

thumbnails: clean-thumbnails
	./scripts/create_thumbnails.sh