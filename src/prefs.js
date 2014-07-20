/* -*- mode: js; js-basic-offset: 4; indent-tabs-mode: tabs -*- */

/**
 * format-clock extension preferences
 * @author: eternal-sorrow <sergamena at mail dot ru>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see {http://www.gnu.org/licenses/}.
 *
 */

const Gtk = imports.gi.Gtk;

const Convenience = imports.misc.extensionUtils.getCurrentExtension().imports.convenience;

const locale_domain="gnome-shell-extensions-format-clock";
const _= imports.gettext.domain(locale_domain).gettext;

let settings = null;

function init()
{
	Convenience.initTranslations(locale_domain);
	settings = Convenience.getSettings();

}

function addRow(grid,text,num,prop)
{
	let label = new Gtk.Label
	({
		label: text,
		hexpand: true,
		halign: Gtk.Align.START
	});
	let entry = new Gtk.Entry
	({
		hexpand: true,
		text: settings.get_string(prop),
	});

	entry.connect
	(
		"changed",
		function(ntr)
		{
			settings.set_string(prop, ntr.get_text());
		}
	);

	grid.attach(label, 0, num, 1, 1);
	// col, row, colspan, rowspan
	grid.attach(entry, 1, num, 1, 1);
	return entry;
}


function buildPrefsWidget() {	
	let grid = new Gtk.Grid
	({
		margin:10,
		row_spacing:10
	});

	let clock_format = addRow
	(
		grid,
		_("Format of panel clock:"),
		0,
		"panel-clock-format"
	);

	let calendar_format = addRow
	(
		grid,
		_("Format of date in calendar menu:"),
		1,
		"calendar-menu-date-format"
	);

	help_text=new Gtk.Label
	({
		label: _("To learn about date format syntax, look, for example, UNIX date manual (type 'man date' in terminal)."),
		hexpand: true,
		halign: Gtk.Align.START,
		wrap: true,
		justify:  Gtk.Justification.FILL,
		selectable: true
	});
	
	grid.attach(help_text, 0, 4, 2, 1);

	grid.show_all();
	return grid;
}

