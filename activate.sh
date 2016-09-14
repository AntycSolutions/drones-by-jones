
platform=`python -c "import platform; print(platform.system())"`

if [[ "$platform" == 'Linux' ]]; then
    source ../venv_dbj/bin/activate
elif [[ "$platform" == 'Windows' ]]; then
    source ../venv_dbj/Scripts/activate
else
    echo "Unsupported platform: $platform"
fi
