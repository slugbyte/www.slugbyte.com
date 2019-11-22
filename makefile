build: 
	rm -rf .cache 
	rm -rf public
	npm run build 

upload:
	aws s3 cp ./public s3://www.slugbyte.com --recursive --acl public-read
	aws cloudfront create-invalidation --distribution-id E3H6F5GZGHD9YL --paths "/*"

nuke: 
	aws s3 rm s3://www.slugbyte.com --recursive 

reset: build nuke upload

publish: build upload


