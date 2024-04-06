#!/bin/bash

PARAMS=('-m 6 -q 70 -mt -af -progress')

if [ $# -ne 0 ]; then
	PARAMS=$@;
fi

cd $(pwd)

shopt -s nullglob nocaseglob extglob

dir="assets/img/projects"
pushd $dir
for FILE in *.@(jpg|jpeg|tif|tiff|png); do 
   cwebp $PARAMS "$dir/$FILE" -o "$dir/${FILE%.*}".webp;
done
popd