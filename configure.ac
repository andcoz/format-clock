dnl Process this file with autoconf to produce a configure script.
dnl Created by Anjuta application wizard.

AC_INIT(app-menu-window-title, 7)

AC_PREFIX_DEFAULT([${HOME}/.local/])

extensiondir='${prefix}/share/gnome-shell/extensions/format-clock@eternal-sorrow.github.com'
AC_SUBST(extensiondir)

IT_PROG_INTLTOOL([0.40.0])

GETTEXT_PACKAGE="gnome-shell-extensions-format-clock"
AC_SUBST(GETTEXT_PACKAGE)

localedir="${extensiondir}/locale";
AC_SUBST(localedir)

GLIB_GSETTINGS

AM_INIT_AUTOMAKE([1.11 foreign])

AM_SILENT_RULES([yes])

AC_OUTPUT([
Makefile
src/Makefile
schemas/Makefile
po/Makefile.in
])
