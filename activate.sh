
platform=`python -c "import platform; print(platform.system())"`

if [[ "$platform" == 'Linux' ]]; then
    source ../venv_dbj/bin/activate
elif [[ "$platform" == 'Windows' ]]; then
    source ../venv_dbj/Scripts/activate
else
    echo "Unsupported platform: $platform"
fi

if [[ -e '../devl' ]]; then
    if [[ ! -e 'dbj/configs/devl_settings.py' ]]; then
        echo 'File devl_settings.py is missing.'
    fi
    export DJANGO_SETTINGS_MODULE=dbj.configs.devl_settings
elif [[ -e '../prod' ]]; then
    if [[ ! -e 'dbj/configs/prod_settings.py' ]]; then
        echo 'File prod_settings.py is missing.'
    fi
    export DJANGO_SETTINGS_MODULE=dbj.configs.prod_settings
else
    echo "Please create a settings decision file."
fi
