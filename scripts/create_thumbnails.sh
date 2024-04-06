#!/usr/bin/env bash
# https://www.preciouschicken.com/blog/posts/imagemagick-thumbnail-bash-script/
# requires ImageMagick
# Sets the desired thumbnail width
WIDTH=600
shopt -s dotglob
dir="$(pwd)/public/assets/img/projects"
pushd $dir
for i in *.webp
do
    # Stores the width of the current file
    file="$dir/$i"
    iwidth=`identify -format "%w" $file`
    if [[ $i != *-thumb.png ]] && [ $iwidth -gt $WIDTH ]
    then
        # Creates thumbnail and adds -thumb to end of new file
        convert -thumbnail ${WIDTH}x $file "$dir/thumb-$i"
        thumbfile="$dir/thumb-$i"
        thumbwidth=`identify -format "%w" $thumbfile`
        thumbheight=`identify -format "%h" $thumbfile`
        echo "$i $thumbwidth x $thumbheight"
    fi
done
popd $dir