/* -*- mode: js; js-basic-offset: 4; indent-tabs-mode: tabs -*- */

/**
 * format-clock extension
 * @author: eternal-sorrow <sergamena at mail dot ru>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see {http://www.gnu.org/licenses/}.
 *
 */


const Lang = imports.lang;
const DateMenu = imports.ui.main.panel.statusArea.dateMenu;
const LockScreen = imports.ui.main.screenShield;


const LockClock = imports.ui.screenShield.Clock.prototype;
const CalendarClock = imports.ui.dateMenu.DateMenuButton.prototype;

const Convenience=imports.misc.extensionUtils.getCurrentExtension().imports.convenience;

const old_calenar_update_clock = CalendarClock._updateClockAndDate;
const old_screen_lock_update_clock = LockClock._updateClock;

const calenar_update_clock = function()
{
	let displayDate = new Date();
	this._clockDisplay.set_text(displayDate.toLocaleFormat(panelClockFormat));
	this._date.set_text(displayDate.toLocaleFormat(calendarButtonClockFormat));
}

const screen_lock_update_clock = function()
{
	this._time.text = this._wallClock.clock;
	let date = new Date();
	this._date.text = date.toLocaleFormat(lockScreenDateFormat);
}

let calendarButtonClockFormat=null;
let panelClockFormat=null;
let lockScreenDateFormat=null;
let dm_disconnectId=null;
let  lc_disconnectId=null;
let _settings=null;

function init()
{
	_settings=Convenience.getSettings();
}

function enable()
{
	calendarButtonClockFormat=_settings.get_string("calendar-menu-date-format");
	panelClockFormat=_settings.get_string("panel-clock-format");
	lockScreenDateFormat=_settings.get_string("lock-screen-date-format");

	//XXX Unable to disconnect by ID
	DateMenu._updateClockAndDate = calenar_update_clock;
	dm_disconnectId = DateMenu._clock.connect('notify::clock',
			Lang.bind(DateMenu, DateMenu._updateClockAndDate));
	DateMenu._updateClockAndDate();

	LockClock._updateClock = screen_lock_update_clock;
	//XXX same problem as with `dm` above.
	if (!(typeof(LockScreen._wallClock) === "undefined"))
	{
		LockScreen._updateClock = screen_lock_update_clock;
		lc_disconnectId = LockScreen._wallClock.connect('notify::clock',
				Lang.bind(LockScreen, LockScreen._updateClock));
		LockScreen._updateClock();
	}
}

function disable()
{
	DateMenu._clock.disconnect(dm_disconnectId);
	DateMenu._updateClockAndDate = old_calenar_update_clock;
	DateMenu._clock.connect('notify::clock',
		Lang.bind(DateMenu, DateMenu._updateClockAndDate));
	DateMenu._updateClockAndDate();

	LockClock._updateClock = old_screen_lock_update_clock;
	if (!(typeof(LockScreen._wallClock) === "undefined"))
	{
		LockScreen._updateClock = old_screen_lock_update_clock;
		LockScreen._wallClock.disconnect(lc_disconnectId);
		LockScreen._wallClock.connect('notify::clock',
			Lang.bind(LockScreen,LockScreen._updateClock));
		LockScreen._updateClock();
	}
}

