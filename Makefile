.PHONY: clean gobuild build serve

gobuild:
	go build -o pw

cleangobuild:
	rm pw

clean:
	rm -rf output/*
	touch output/.gitkeep

dockerbuild: clean
	docker build -t bjarke.xyz/personal-website -f build.Dockerfile .
	docker create --name personal-website bjarke.xyz/personal-website
	docker cp personal-website:/app/output/. ./output/
	docker rm personal-website

build: clean gobuild
	./pw --command build --verbose

serve: gobuild
	./pw --command serve --verbose

dev: clean gobuild
	./pw --command buildAndServe --verbose

clean-thumbnails:
	rm -f ./assets/img/projects/thumb-*

thumbnails: clean-thumbnails
	./scripts/create_thumbnails.sh