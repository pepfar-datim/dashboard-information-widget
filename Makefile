build:
	rm -rf build_temp
	mkdir build_temp
	cp -r meta/* build_temp
	cd render && npm run build
	cp -r render/dist/* build_temp
	rm -f dashboard-information-widget.zip
	cd build_temp && zip ../dashboard-information-widget.zip -r .

