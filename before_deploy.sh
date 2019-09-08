# get the current branch name and create a directory destination using it
dest_dir="$(git rev-parse --abbrev-ref HEAD)"

# make the destination directory
mkdir -p $dest_dir

echo $dest_dir

# copy the web build
cp -R dist/ $dest_dir
