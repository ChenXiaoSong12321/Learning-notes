require 'compass/import-once/activate'
# Require any additional compass plugins here.

# 开发时将publicss放在/home/httpd/html/include中，使用开法环境的配置，注释掉git库中的配置，
# 修改完成后将publicss中sass放到git库的/utf-64bit/WEB/publicss文件夹中

# 编译：compass compile
# 监听改变并生成css ：  compass watch
# 删除之前并强制生成新的css ：  compass compile --force

# 开发环境 将publicss放在/home/httpd/html/include中 
# compass watch -c config.rb.develpment

# http_path = "/"
# css_dir = "../"
# sass_dir = "sass"
# images_dir = "../../images"
# javascripts_dir = "../"
# output_style = :expanded
# relative_assets = true

# git库  在/utf-64bit/WEB/publicss
# compass compile --force

http_path = "/"
css_dir = "stylesheets"
sass_dir = "sass"
images_dir = "images"
javascripts_dir = "javascripts"
output_style = :compressed
relative_assets = true


# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass




