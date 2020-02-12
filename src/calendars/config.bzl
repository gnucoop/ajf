# List of all entry-points of the Ajf core package.
entryPoints = [
    "ethiopian",
]

# List of all non-testing entry-points of the Ajf calendars package.
CALENDARS_ENTRYPOINTS = [
    ep
    for ep in entryPoints
    if not "/testing" in ep
]

# List of all testing entry-points of the Ajf calendars package.
CALENDARS_TESTING_ENTRYPOINTS = [
    ep
    for ep in entryPoints
    if not ep in CALENDARS_ENTRYPOINTS
]

# List of all entry-point targets of the Ajf calendars package.
CALENDARS_TARGETS = ["//src/calendars"] + ["//src/calendars/%s" % ep for ep in CALENDARS_ENTRYPOINTS]

# List of all testing entry-point targets of the Ajf calendars package.
CALENDARS_TESTING_TARGETS = ["//src/calendars/%s" % ep for ep in CALENDARS_TESTING_ENTRYPOINTS]

CALENDARS_SCSS_LIBS = [
    "//src/calendars/%s:%s_scss_lib" % (p, p.replace("-", "_"))
    for p in CALENDARS_ENTRYPOINTS
]
