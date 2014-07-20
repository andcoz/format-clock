# Format Clock

This Gnome Shell extension allows to modify clock format on the top panel and
date format in calendar menu.

This extension is based on
[Change clock format] (https://extensions.gnome.org/extension/617/fixclock/)
extension, written by
[silvioricardoc] (https://extensions.gnome.org/accounts/profile/silvioricardoc).

## Installation

```sh
git clone https://github.com/eternal-sorrow/format-clock.git
cd format-clock
./autogen.sh
make
make install
```

If you want to uninstall the extension, type:

```sh
# From the root of the project directory
make uninstall
```
## Seconds not ticking
If you have always :00 seconds in the clock, you should enable the
"clock-show-seconds" property in Top Panel tab in the gnome-tweak-tool or at the
path org.gnome.desktop.interface in dconf-editor.

## License

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see http://www.gnu.org/licenses/.

## Author

[Eternal Sorrow](https://github.com/eternal-sorrow) (sergamena at mail dot ru)

Contains code from
[gnome-shell-extensions](https://git.gnome.org/browse/gnome-shell-extensions/)
by Giobanni Campagna
