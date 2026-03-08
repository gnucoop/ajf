<a name="18.0.7"></a>
# 18.0.7 "institutional-mule" (2026-02-13)
### Bug Fixes
* **Cmaterial/form-builder:** disable save and show messages if errors in form ([d43669a](https://github.com/gnucoop/ajf/commit/d43669a191a3749473eef5f2e9fe350248d6c3cb))
* **core/models:** add check for empty arrays in notEmpty validator ([78073ad](https://github.com/gnucoop/ajf/commit/78073adf382f25316ae417c347e5890d657ff5a3))
* **core/models:** ALL_VALUES_OF: stringify json if val is object (images, signature) ([b99cd83](https://github.com/gnucoop/ajf/commit/b99cd83abd33f545de9006473cab61034470cc7b))
* **core/models:** resolve circular dependency ([dcd0fdb](https://github.com/gnucoop/ajf/commit/dcd0fdbca45e8cbddb0663fac6fc267866099ffb))
* **core/models:** use choice origin name as prefix for APPLY_LABELS and GET_LABELS report functions ([2aef50c](https://github.com/gnucoop/ajf/commit/2aef50c3b2f8ddec994c4f3d00a571872ba7b4e5))
* **core/reports:** Added optional property "exportable" to AjfPaginatedListWidget interface ([145e786](https://github.com/gnucoop/ajf/commit/145e7866360afa3bb1701ca8448854a4bb30095b))
* **core/reports:** change .toString to String() in table export ([2de0e42](https://github.com/gnucoop/ajf/commit/2de0e421255ad83168b7dae7588157c75c0ade1c))
* **core/reports:** export all values for array for table in reports ([3077d08](https://github.com/gnucoop/ajf/commit/3077d082f16c013e93c11626047e39e6d3cf20dc))
* **core/reports:** fix object, array or boolean values in table export pdf and doc ([94d45a2](https://github.com/gnucoop/ajf/commit/94d45a239336f2359e83a2851dc35865c152db21))
* **core:** fix createFunction/evaluateExpression for expressions that start with [ but are not json ([8e1b016](https://github.com/gnucoop/ajf/commit/8e1b016b234e143db2fbcd7955f0d33b0ea92a8b))
* **material/form-builder:** fix default value in form builder ([4c721e9](https://github.com/gnucoop/ajf/commit/4c721e9f2d6662efa555187b66906bea2c8ce4e9))
* **material/form-builder:** lint ([57cd7c1](https://github.com/gnucoop/ajf/commit/57cd7c1631dbd0132c47dfb99f471ef5f172b311))
* **material/form-builder:** ordered name and label input ([84dcc8d](https://github.com/gnucoop/ajf/commit/84dcc8d1e5e41f2178af9fbc98c2b4d6d8746ec6))
* **material/form-builder:** remove required from formulaReps for rep slide ([60f5ba3](https://github.com/gnucoop/ajf/commit/60f5ba37c598a562aa78215dfc271fb9d9fa7ed8))
* **material/form-builder:** set name to required for choice origin ([94aa9ab](https://github.com/gnucoop/ajf/commit/94aa9ab9ffb7e4856185b8f5327be353882374eb))
* **material/form-builder:** slides icons and min/maxReps error ([e6d5a70](https://github.com/gnucoop/ajf/commit/e6d5a70599dbf99a7d2529106868cf9edc0249f1))
* **material/forms:** dynamic cell height in table ([1c3705b](https://github.com/gnucoop/ajf/commit/1c3705b502f2e541fb7ec46a4615dc898bdf3b57))
### Features
* **core/forms:** Added support for removing rep slides other than the last one ([3dcf50f](https://github.com/gnucoop/ajf/commit/3dcf50fb3e9521886daf73aa906fbf25a33ae0f8))
* **core/page-slider:** enable smooth scrolling on form slides, web and mobile ([7bd6737](https://github.com/gnucoop/ajf/commit/7bd6737cbc3f5dc49aa798af60069d6f75d0f6c0))
* **core/reports:** trim and check xlsreport variable names ([0e2bde5](https://github.com/gnucoop/ajf/commit/0e2bde51b8188d0451e4fced38491b8e592345bf))
* **material/form-builder:** Add and expose form builder validation via @Output ([d5147ae](https://github.com/gnucoop/ajf/commit/d5147ae9eb61ca2ba9c810ce6a1459bc3a7390d3))
* **material/form-builder:** add Note field in form builder ([0cb771e](https://github.com/gnucoop/ajf/commit/0cb771efb7ae86a1c02ac139b55c375c6f5e9e02))
* **material/form-builder:** undo label not required ([920db41](https://github.com/gnucoop/ajf/commit/920db414fe7b30fe98e9a9c54070287b77b59ce0))
* **material/from-builder:** restyle fb sidenav menu ([698bc2e](https://github.com/gnucoop/ajf/commit/698bc2e2a157a30a3ad70188978f34a9f617b661))

<!-- CHANGELOG SPLIT MARKER -->

<a name="18.0.6"></a>
# 18.0.6 "xerothermic-lynx" (2026-01-30)
### Bug Fixes
* **core/reports:** export all values for array for table in reports ([3077d08](https://github.com/gnucoop/ajf/commit/3077d082f16c013e93c11626047e39e6d3cf20dc))
* **material/form-builder:** fix default value in form builder ([4c721e9](https://github.com/gnucoop/ajf/commit/4c721e9f2d6662efa555187b66906bea2c8ce4e9))

<!-- CHANGELOG SPLIT MARKER -->

<a name="18.0.5"></a>
# 18.0.5 "eerie-hamster" (2025-12-01)

<!-- CHANGELOG SPLIT MARKER -->

<a name="18.0.4"></a>
# 18.0.4 "glad-cougar" (2025-12-01)
### Bug Fixes
* **core/models:** ALL_VALUES_OF: stringify json if val is object (images, signature) ([b99cd83](https://github.com/gnucoop/ajf/commit/b99cd83abd33f545de9006473cab61034470cc7b))
* **material/form-builder:** ordered name and label input ([84dcc8d](https://github.com/gnucoop/ajf/commit/84dcc8d1e5e41f2178af9fbc98c2b4d6d8746ec6))
* **material/form-builder:** slides icons and min/maxReps error ([e6d5a70](https://github.com/gnucoop/ajf/commit/e6d5a70599dbf99a7d2529106868cf9edc0249f1))
### Features
* **core/forms:** Added support for removing rep slides other than the last one ([3dcf50f](https://github.com/gnucoop/ajf/commit/3dcf50fb3e9521886daf73aa906fbf25a33ae0f8))
* **material/form-builder:** add Note field in form builder ([0cb771e](https://github.com/gnucoop/ajf/commit/0cb771efb7ae86a1c02ac139b55c375c6f5e9e02))
* **material/form-builder:** undo label not required ([920db41](https://github.com/gnucoop/ajf/commit/920db414fe7b30fe98e9a9c54070287b77b59ce0))
* **material/from-builder:** restyle fb sidenav menu ([698bc2e](https://github.com/gnucoop/ajf/commit/698bc2e2a157a30a3ad70188978f34a9f617b661))

<!-- CHANGELOG SPLIT MARKER -->

<a name="18.0.3"></a>
# 18.0.3 "popular-pinniped" (2025-09-25)
### Bug Fixes
* **material/form-builder:** remove required from formulaReps for rep slide ([60f5ba3](https://github.com/gnucoop/ajf/commit/60f5ba37c598a562aa78215dfc271fb9d9fa7ed8))
* **material/form-builder:** set name to required for choice origin ([94aa9ab](https://github.com/gnucoop/ajf/commit/94aa9ab9ffb7e4856185b8f5327be353882374eb))

<!-- CHANGELOG SPLIT MARKER -->

<a name="18.0.2"></a>
# 18.0.2 "anxious-heron" (2025-07-31)
### Bug Fixes
* **Cmaterial/form-builder:** disable save and show messages if errors in form ([d43669a](https://github.com/gnucoop/ajf/commit/d43669a191a3749473eef5f2e9fe350248d6c3cb))
* **material/form-builder:** lint ([57cd7c1](https://github.com/gnucoop/ajf/commit/57cd7c1631dbd0132c47dfb99f471ef5f172b311))
### Features
* **material/form-builder:** Add and expose form builder validation via @Output ([d5147ae](https://github.com/gnucoop/ajf/commit/d5147ae9eb61ca2ba9c810ce6a1459bc3a7390d3))

<!-- CHANGELOG SPLIT MARKER -->

<a name="18.0.1"></a>
# 18.0.1 "maximum-turkey" (2025-07-03)
### Bug Fixes
* **core/models:** add check for empty arrays in notEmpty validator ([78073ad](https://github.com/gnucoop/ajf/commit/78073adf382f25316ae417c347e5890d657ff5a3))
* **core/models:** resolve circular dependency ([dcd0fdb](https://github.com/gnucoop/ajf/commit/dcd0fdbca45e8cbddb0663fac6fc267866099ffb))
* **core/models:** use choice origin name as prefix for APPLY_LABELS and GET_LABELS report functions ([2aef50c](https://github.com/gnucoop/ajf/commit/2aef50c3b2f8ddec994c4f3d00a571872ba7b4e5))
### Features
* **core/reports:** trim and check xlsreport variable names ([0e2bde5](https://github.com/gnucoop/ajf/commit/0e2bde51b8188d0451e4fced38491b8e592345bf))

<!-- CHANGELOG SPLIT MARKER -->

<a name="18.0.0"></a>
# 18.0.0 "misleading-elephant" (2025-04-28)
### Bug Fixes
* **core/reports:** Added optional property "exportable" to AjfPaginatedListWidget interface ([145e786](https://github.com/gnucoop/ajf/commit/145e7866360afa3bb1701ca8448854a4bb30095b))

<!-- CHANGELOG SPLIT MARKER -->

<a name="16.1.14"></a>
# 16.1.14 "due-wolf" (2025-04-15)
### Bug Fixes
* **material/forms:** dynamic cell height in table ([1c3705b](https://github.com/gnucoop/ajf/commit/1c3705b502f2e541fb7ec46a4615dc898bdf3b57))
### Features
* **core/page-slider:** enable smooth scrolling on form slides, web and mobile ([7bd6737](https://github.com/gnucoop/ajf/commit/7bd6737cbc3f5dc49aa798af60069d6f75d0f6c0))

<!-- CHANGELOG SPLIT MARKER -->

<a name="16.1.13"></a>
# 16.1.13 "modern-cardinal" (2025-03-31)
### Bug Fixes
* **core/reports:** change .toString to String() in table export ([2de0e42](https://github.com/gnucoop/ajf/commit/2de0e421255ad83168b7dae7588157c75c0ade1c))
* **core/reports:** fix object, array or boolean values in table export pdf and doc ([94d45a2](https://github.com/gnucoop/ajf/commit/94d45a239336f2359e83a2851dc35865c152db21))

<!-- CHANGELOG SPLIT MARKER -->

<a name="16.1.12"></a>
# 16.1.12 "fluffy-turkey" (2025-03-25)
### Bug Fixes
* **core/models:** FROM_REPS: remove null values ([e8c51e5](https://github.com/gnucoop/ajf/commit/e8c51e55eb327cb7fcb80f778090aa351916a096))
* **core/reports:** fix default parameters in FIRST e LAST functions ([faf0de6](https://github.com/gnucoop/ajf/commit/faf0de621c1a3736f7c3ca3ba22f086e229915d3))
* **material/reports:** decrease size of xlsreport filters ([4412688](https://github.com/gnucoop/ajf/commit/441268853da743ea6efe25f014261bd8dadb4b0f))

<!-- CHANGELOG SPLIT MARKER -->

<a name="16.1.11"></a>
# 16.1.11 "missing-toucan" (2025-01-17)
### Features
* **core/reports:** xlsreport improvements for social balance ([2a65535](https://github.com/gnucoop/ajf/commit/2a655352c01f3a9f73921224297fdae70797d610))

<!-- CHANGELOG SPLIT MARKER -->

<a name="16.1.10"></a>
# 16.1.10 "necessary-grasshopper" (2025-01-10)
### Bug Fixes
* **core/chart:** disable mainDataNumberThreshold using zero value if required by xls-report ([357fa18](https://github.com/gnucoop/ajf/commit/357fa1828f3d92109f63d4e84f3fb9781cd813e6))
* **core/chart:** fix rebuild dataset for pie chart ([8786bbd](https://github.com/gnucoop/ajf/commit/8786bbdbb5514203615261c2dd0fa7a1226bc682))
* **core/forms:** set null value for calculate fields if value is equals to NaN ([e3909c4](https://github.com/gnucoop/ajf/commit/e3909c4d841b68565642bb50280be3ac360e8326))
* **core/models:** fill empty repeating slide instance in report dataset ([763fc24](https://github.com/gnucoop/ajf/commit/763fc248f5d9da1f2d310edd11df7e5db64061b8))
* **core/reports:** export function for evaluate report variables ([89ea2d7](https://github.com/gnucoop/ajf/commit/89ea2d7d97cfae915b4efbe22fe7e97e69827f0c))
* **core/reports:** fix boolean value when false for removeZeroValues option ([1c0d6eb](https://github.com/gnucoop/ajf/commit/1c0d6ebdc797d2ad0506b4dcc63467f83e1c3ebf))
* **core/reports:** fix range widget in automatic report ([d77aaf5](https://github.com/gnucoop/ajf/commit/d77aaf515fa060da06a9cbdd9ea5b524dbd645e0))
* **core/reports:** format.. ([5101da0](https://github.com/gnucoop/ajf/commit/5101da056682d741ab2162a97ea3c185d2cc74f0))
* **core/reports:** modify context when evaluate report variables ([9035860](https://github.com/gnucoop/ajf/commit/9035860232c4e81b04bddb1808b4752c49e6c04a))
* **core/reports:** rename WIDGET_PIE_TO_JSON to CHART_TO_DATA and change return type to string ([6ead16d](https://github.com/gnucoop/ajf/commit/6ead16d592e7f7b950da870e47db6c20a6f03b5f))
* **material/forms:** fix hint icon width in forms for long text ([879ec7d](https://github.com/gnucoop/ajf/commit/879ec7dbcfb679a433cd1945cb70e136835dfb14))
* **material/reports:** export all rows for paginated table widget ([14f1230](https://github.com/gnucoop/ajf/commit/14f1230be4b5e088084063fc39016c022eb0fdd8))
### Features
* **core/forms:** Remove file content if greather than the max size limit ([6328f4d](https://github.com/gnucoop/ajf/commit/6328f4d25c59de6c4f27ad307d3404b921c45731))
* **core/forms:** Set the default size limit condition for file input fields for slide and repeating slide ([6c768b7](https://github.com/gnucoop/ajf/commit/6c768b757ac52740c0a36e53f24ac0c5e499e644))
* **core/forms:** Set the default size limit condition for file input fields if no size limit condition is found ([4103fe2](https://github.com/gnucoop/ajf/commit/4103fe2a3c7f366c3190cbbb87e35a7247ef7285))
* **core/models:** add WIDGET_PIE_TO_JSON function for reports ([59c2cac](https://github.com/gnucoop/ajf/commit/59c2cacdec8906cbeccf47c9bfb4ae9810657069))
* **core/models:** Fix STD and MEDIAN functions in expression utils. ([da12978](https://github.com/gnucoop/ajf/commit/da129781de361bf563127eeed18690e081d7c090))
* **core/reports:** add isAIPrompt column in variables sheet ([8fb2b4c](https://github.com/gnucoop/ajf/commit/8fb2b4c584f7324d64228265b23fe3b39c4274ed))
* **core/reports:** add mainDataNumberThreshold and removeZeroValues options in xls report for chart widgets ([b8697c3](https://github.com/gnucoop/ajf/commit/b8697c34c3874aa0839a1b73e819a595efaf8666))
* **core/reports:** add PaginatedTable to export doc and pdf ([8f2a659](https://github.com/gnucoop/ajf/commit/8f2a6592b64b15aa21da19ba82ecd518a7451188))
* **core/reports:** functions for formatting tables' data as html ([f045db6](https://github.com/gnucoop/ajf/commit/f045db653932af93f12395696403028c8ff9089b))
* **core/reports:** PROMPT_RESULT function ([da299e2](https://github.com/gnucoop/ajf/commit/da299e22d08f961877041d3d3c0fc538c5c433c8))
* **material/forms:** redesign table field ([34857c7](https://github.com/gnucoop/ajf/commit/34857c798ca74dcac9d7d662d9f36d330e882b16))

<!-- CHANGELOG SPLIT MARKER -->

<a name="16.1.9"></a>
# 16.1.9 "xenophobic-primate" (2024-12-18)
### Bug Fixes
* **core/reports:** rename WIDGET_PIE_TO_JSON to CHART_TO_DATA and change return type to string ([6ead16d](https://github.com/gnucoop/ajf/commit/6ead16d592e7f7b950da870e47db6c20a6f03b5f))
### Features
* **core/forms:** Remove file content if greather than the max size limit ([6328f4d](https://github.com/gnucoop/ajf/commit/6328f4d25c59de6c4f27ad307d3404b921c45731))
* **core/forms:** Set the default size limit condition for file input fields for slide and repeating slide ([6c768b7](https://github.com/gnucoop/ajf/commit/6c768b757ac52740c0a36e53f24ac0c5e499e644))
* **core/forms:** Set the default size limit condition for file input fields if no size limit condition is found ([4103fe2](https://github.com/gnucoop/ajf/commit/4103fe2a3c7f366c3190cbbb87e35a7247ef7285))
* **core/reports:** add PaginatedTable to export doc and pdf ([8f2a659](https://github.com/gnucoop/ajf/commit/8f2a6592b64b15aa21da19ba82ecd518a7451188))

<!-- CHANGELOG SPLIT MARKER -->

<a name="16.1.8"></a>
# 16.1.8 "acute-gopher" (2024-11-19)
### Bug Fixes
* **core/models:** fill empty repeating slide instance in report dataset ([763fc24](https://github.com/gnucoop/ajf/commit/763fc248f5d9da1f2d310edd11df7e5db64061b8))
* **core/reports:** export function for evaluate report variables ([89ea2d7](https://github.com/gnucoop/ajf/commit/89ea2d7d97cfae915b4efbe22fe7e97e69827f0c))
* **core/reports:** format.. ([5101da0](https://github.com/gnucoop/ajf/commit/5101da056682d741ab2162a97ea3c185d2cc74f0))
* **core/reports:** modify context when evaluate report variables ([9035860](https://github.com/gnucoop/ajf/commit/9035860232c4e81b04bddb1808b4752c49e6c04a))
* **material/reports:** export all rows for paginated table widget ([14f1230](https://github.com/gnucoop/ajf/commit/14f1230be4b5e088084063fc39016c022eb0fdd8))
### Features
* **core/models:** add WIDGET_PIE_TO_JSON function for reports ([59c2cac](https://github.com/gnucoop/ajf/commit/59c2cacdec8906cbeccf47c9bfb4ae9810657069))
* **core/reports:** add isAIPrompt column in variables sheet ([8fb2b4c](https://github.com/gnucoop/ajf/commit/8fb2b4c584f7324d64228265b23fe3b39c4274ed))
* **core/reports:** PROMPT_RESULT function ([da299e2](https://github.com/gnucoop/ajf/commit/da299e22d08f961877041d3d3c0fc538c5c433c8))

<!-- CHANGELOG SPLIT MARKER -->

<a name="16.1.7"></a>
# 16.1.7 "parliamentary-grouse" (2024-10-16)

<!-- CHANGELOG SPLIT MARKER -->

<a name="16.1.6"></a>
# 16.1.6 "unfair-cuckoo" (2024-10-16)
### Bug Fixes
* **core/forms:** set null value for calculate fields if value is equals to NaN ([e3909c4](https://github.com/gnucoop/ajf/commit/e3909c4d841b68565642bb50280be3ac360e8326))
* **core/reports:** fix range widget in automatic report ([d77aaf5](https://github.com/gnucoop/ajf/commit/d77aaf515fa060da06a9cbdd9ea5b524dbd645e0))
* **material/forms:** fix hint icon width in forms for long text ([879ec7d](https://github.com/gnucoop/ajf/commit/879ec7dbcfb679a433cd1945cb70e136835dfb14))
### Features
* **material/forms:** redesign table field ([34857c7](https://github.com/gnucoop/ajf/commit/34857c798ca74dcac9d7d662d9f36d330e882b16))

<!-- CHANGELOG SPLIT MARKER -->

<a name="16.1.5"></a>
# 16.1.5 "universal-bonobo" (2024-09-02)
### Bug Fixes
* **core/chart:** disable mainDataNumberThreshold using zero value if required by xls-report ([357fa18](https://github.com/gnucoop/ajf/commit/357fa1828f3d92109f63d4e84f3fb9781cd813e6))

<!-- CHANGELOG SPLIT MARKER -->

<a name="16.1.4"></a>
# 16.1.4 "silky-lark" (2024-08-30)
### Bug Fixes
* **core/reports:** fix boolean value when false for removeZeroValues option ([1c0d6eb](https://github.com/gnucoop/ajf/commit/1c0d6ebdc797d2ad0506b4dcc63467f83e1c3ebf))

<!-- CHANGELOG SPLIT MARKER -->

<a name="16.1.3"></a>
# 16.1.3 "positive-harrier" (2024-08-29)
### Features
* **core/reports:** add mainDataNumberThreshold and removeZeroValues options in xls report for chart widgets ([b8697c3](https://github.com/gnucoop/ajf/commit/b8697c34c3874aa0839a1b73e819a595efaf8666))

<!-- CHANGELOG SPLIT MARKER -->

<a name="16.1.2"></a>
# 16.1.2 "known-jellyfish" (2024-08-28)
### Bug Fixes
* **core/chart:** fix rebuild dataset for pie chart ([8786bbd](https://github.com/gnucoop/ajf/commit/8786bbdbb5514203615261c2dd0fa7a1226bc682))
### Features
* **core/models:** Fix STD and MEDIAN functions in expression utils. ([da12978](https://github.com/gnucoop/ajf/commit/da129781de361bf563127eeed18690e081d7c090))

<!-- CHANGELOG SPLIT MARKER -->

<a name="16.1.1"></a>
# 16.1.1 "identical-falcon" (2024-08-14)
### Features
* **core/chart:** Added _rebuildDatasets method. Filters out options never chosen and groups options beyond a set threshold into an "other" dataset. ([36c768d](https://github.com/gnucoop/ajf/commit/36c768d81fda4ddcc6637409c59f5f9aefa7c523))
* **core/forms:** add readonly formula for form fields ([cd3d5f9](https://github.com/gnucoop/ajf/commit/cd3d5f99a6690fc3cf4158cfee34bd94efde5052))
* **core/forms:** add readonly formula for rep slide fields ([eabacd6](https://github.com/gnucoop/ajf/commit/eabacd6c1450cb924e28fb42122848210f23a403))
* **core/forms:** Added nodesVisibility get property to form renderer. Returns a map of all Form Nodes, slides and fields, with their visibility conditions evaluated. ([0416815](https://github.com/gnucoop/ajf/commit/041681557c9d19bd56082448617a13227fe02389))
* **core/forms:** clean rep slide fields from editability map ([cd2c618](https://github.com/gnucoop/ajf/commit/cd2c618f80f23cbbc31aca888d53379ccee6562a))
* **core/models:** Added STD function to expression utils. ([f216cdd](https://github.com/gnucoop/ajf/commit/f216cddd65555936f7828fa69dbe8f18f4e3236b))
* **core/reports/automatic-report:** Added sum and standard deviation widgets. Formula fieldTypes are now treated as number fieldTypes. ([8cd6f9a](https://github.com/gnucoop/ajf/commit/8cd6f9a35a031185dfd6aac8d70d221879e8a479))
* **material/report:** Added mainDataNumberThreshold input to chart-widget. Defaults to 10. ([f712e11](https://github.com/gnucoop/ajf/commit/f712e1164540342cfef16ca0e1bc5aa2639f0d54))

<!-- CHANGELOG SPLIT MARKER -->

<a name="16.1.0"></a>
# 16.1.0 "bad-flea" (2024-08-14)
### Bug Fixes
* **core/barcode:** Fixed a bug caused by a missing undefined check on the barcode video element when resetting or stopping streams. ([111c647](https://github.com/gnucoop/ajf/commit/111c6476916c3ba420fe8e9756dd71d9186fe26c))
* **core/forms:** add all info when create a new validation ([cd1572f](https://github.com/gnucoop/ajf/commit/cd1572f282d66154144488efb4c714e3c5912738))
* **core/forms:** change readonly data field format based on language ([60bccbc](https://github.com/gnucoop/ajf/commit/60bccbc18474e31fd795d21855c9270d626ab6db))
* **core/forms:** combine form init event with flat nodes ([94311da](https://github.com/gnucoop/ajf/commit/94311da6b343d01f8f57ee288e2ccef317125215))
* **core/forms:** enable cascade formula fields: remove context modification to enable valuechanges on formula update ([a48687a](https://github.com/gnucoop/ajf/commit/a48687ae1a64904e848cf8fc42055b5d4d6b5dc9))
* **core/forms:** form-renderer: rollback flatNodes in withLatestFrom and force a valueChange when flatNodes are ready, to start the initialisation flow ([8b7a90b](https://github.com/gnucoop/ajf/commit/8b7a90b81cdf77eff079af8731f8978e1128c52e))
* **core/forms:** notEmptyMessage reimplemented in retro-compatible way ([c3b9f94](https://github.com/gnucoop/ajf/commit/c3b9f94b314e01a73d625fb5ef106e43a738168b))
* **core/forms:** pdf printing of repeating slide number starts at 1 ([a464783](https://github.com/gnucoop/ajf/commit/a46478354184dc87e16c1d402826cb9a379494bf))
* **core/forms:** prints date even when formcontrol changes ([1a61104](https://github.com/gnucoop/ajf/commit/1a6110433d39e75316b155e4486b482da270e603))
* **core/forms:** remove orientation changer in page slider ([1251ab6](https://github.com/gnucoop/ajf/commit/1251ab6ad79d6c5089d50cf3507ac4c4932745ce))
* **core/forms:** set default value when field or slide visibility changed ([958dd7c](https://github.com/gnucoop/ajf/commit/958dd7cd5a842b4c273096105d121cb46ab44684))
* **core/forms:** set reps values in formgroup after visibility update ([c81fa53](https://github.com/gnucoop/ajf/commit/c81fa5364e2e67402314fbfd052e7e217743abba))
* **core/forms:** validation message will always be updated by the pipeline on multiple conditions ([f8723cf](https://github.com/gnucoop/ajf/commit/f8723cf1397b28c8df2a5607cdb9322ce13291b2))
* **core/range:** set correct value for range slider when min or max change ([4c5b368](https://github.com/gnucoop/ajf/commit/4c5b368721b6e54d29b8980f913ed724f1ed03cf))
* **core/reports:** Add css for single indicator widget ([886ce13](https://github.com/gnucoop/ajf/commit/886ce13b9c83546669959f0a1d5aabad23259d7f))
* **core/reports:** autoreport restyling ([a20022a](https://github.com/gnucoop/ajf/commit/a20022a74bac6173226214dcf1e879ba3f9df8fe))
* **core/reports:** autoreport small fix ([0cd4c36](https://github.com/gnucoop/ajf/commit/0cd4c3639a0bd5fb46a837ea095e04d5e923e359))
* **core/reports:** fix and test APPLY_LABELS function ([aa86918](https://github.com/gnucoop/ajf/commit/aa869185c3eb27fa8c2d2c3177ea02308fc79bdd))
* **core/reports:** fix docx library inclusion ([cf56b42](https://github.com/gnucoop/ajf/commit/cf56b4233f7129f9272faafd3ce236895858ecfc))
* **core/reports:** fix FROM_REPS function ([992f9cf](https://github.com/gnucoop/ajf/commit/992f9cf01f26712b977199019b4167ef532d2223))
* **core/reports:** fix xlsreport charts size and proportions ([a472c49](https://github.com/gnucoop/ajf/commit/a472c49aa6084daff8317dc95481b5feca7baa34))
* **core/reports:** fix xlsx export of tables with null cells ([43e3de6](https://github.com/gnucoop/ajf/commit/43e3de6ada0bc3400e2866ece6f0f13e3a6af2e4))
* **core/reports:** improve formulas for repeating slides in autoreports ([d89f8a2](https://github.com/gnucoop/ajf/commit/d89f8a26125023879be72f0f2853f222af9bcc87))
* **core/reports:** null check in printing of report tables ([5d7b80b](https://github.com/gnucoop/ajf/commit/5d7b80bdfd1b69e13e091fd5738298305262edfa))
* **core/reports:** xlsreport charts various fixes ([a7e564a](https://github.com/gnucoop/ajf/commit/a7e564a4897c6c520196ab14e9bdf43cd7e5ed03))
* **core/transloco:** modified some spanish translations ([dc3819f](https://github.com/gnucoop/ajf/commit/dc3819fd079c6e30986f46469ad113229bc98630))
* **core/utils:** Deep-copy functionDeserializer type issue in array.concat argument. ([eeed45d](https://github.com/gnucoop/ajf/commit/eeed45d6f7c0e8448a615078493bb231311d73e7))
* **material/form-builder:** Added forwardRef to childEntries queryList. ([c0a3cc1](https://github.com/gnucoop/ajf/commit/c0a3cc1dea923c46a0f5804745fffae0c1cf5882))
* **material/form-builder:** fix formbuilder sticky bar ([af21ea4](https://github.com/gnucoop/ajf/commit/af21ea48c79f844c54880799fac245a67273a2ae))
* **material/form-builder:** Fixed a bug causing ChoicesOriginRef not to be updated when a Choices Origin is edited. ([d3d4428](https://github.com/gnucoop/ajf/commit/d3d4428a522e8cbaf99aef3e94dc9cdfc03c0a9e))
* **material/form-builder:** Fixed a css issue causing Properties to disappear when title/visibility condition are too long. ([e0b9316](https://github.com/gnucoop/ajf/commit/e0b9316cd09d76a9aeb6f256eb8cab78c96bb865))
* **material/form-builder:** Fixed various bugs (Could not add new slides, could not save Hints etc.). ([3cf94a8](https://github.com/gnucoop/ajf/commit/3cf94a88d03ba42659155872aef24749c9d78acc))
* **material/form-builder:** Save in properties is now disabled if name or label field are empty. ([a638fd4](https://github.com/gnucoop/ajf/commit/a638fd40cc5bf971714739c15811d79ed5c4948e))
* **material/form-builder:** set max width for very long formulae ([cb42fe4](https://github.com/gnucoop/ajf/commit/cb42fe46860f0b41a782bb975322a61dedeb369c))
* **material/formbuilder:** Small css fixes to visibility condition overflow and formtree properties. ([f8552e2](https://github.com/gnucoop/ajf/commit/f8552e2e2615f232a476e9ecc3d3a56f7678f0c8))
* **material/forms:** add padding-top for range tooltip ([79d1885](https://github.com/gnucoop/ajf/commit/79d1885479adb9d59ee03b8fea288804473546c2))
* **material/forms:** fix bug with form builder icons ([6e3f24b](https://github.com/gnucoop/ajf/commit/6e3f24b8bb62ec64c762945c37e447e93978be2f))
* **material/forms:** fix choice fields with few choices ([8ad4a8c](https://github.com/gnucoop/ajf/commit/8ad4a8c207f6dee4965e6e8ac58efa8aed8d6d25))
* **material/forms:** fix choice fields with filter ([ff54e91](https://github.com/gnucoop/ajf/commit/ff54e913e05b54c851ce9b94e3b866591e39eac7))
* **material/forms:** fix page slider wheel event ([2ff6e00](https://github.com/gnucoop/ajf/commit/2ff6e00e389cb565b664a67c92a75dd52d3a608b))
* **material/forms:** remove validity icon from slide tab when slide is not visible ([0b38e7b](https://github.com/gnucoop/ajf/commit/0b38e7b8840be99d907bbfafecd6eb4b419e049c))
### Features
* **core/chart:** Added _rebuildDatasets method. Filters out options never chosen and groups options beyond a set threshold into an "other" dataset. ([36c768d](https://github.com/gnucoop/ajf/commit/36c768d81fda4ddcc6637409c59f5f9aefa7c523))
* **core/forms:** add range field available in form-to-pdf ([01d2091](https://github.com/gnucoop/ajf/commit/01d20917d95fe5ba923fac6c556ada5f7bcc046b))
* **core/forms:** add readonly formula for form fields ([cd3d5f9](https://github.com/gnucoop/ajf/commit/cd3d5f99a6690fc3cf4158cfee34bd94efde5052))
* **core/forms:** add readonly formula for rep slide fields ([eabacd6](https://github.com/gnucoop/ajf/commit/eabacd6c1450cb924e28fb42122848210f23a403))
* **core/forms:** Added nodesVisibility get property to form renderer. Returns a map of all Form Nodes, slides and fields, with their visibility conditions evaluated. ([0416815](https://github.com/gnucoop/ajf/commit/041681557c9d19bd56082448617a13227fe02389))
* **core/forms:** Added Signature field and field type. ([cb700ec](https://github.com/gnucoop/ajf/commit/cb700ec9142df4dc424c0012e1ff707cb9f996e1))
* **core/forms:** clean rep slide fields from editability map ([cd2c618](https://github.com/gnucoop/ajf/commit/cd2c618f80f23cbbc31aca888d53379ccee6562a))
* **core/forms:** customizable notEmpty message ([eda13f5](https://github.com/gnucoop/ajf/commit/eda13f54548d312579045848a5eeb0180b0071a2))
* **core/forms:** download forms as docx ([e1f2db5](https://github.com/gnucoop/ajf/commit/e1f2db59ba9f27209ecac68422c2e6e71269ebac))
* **core/models:** Added STD function to expression utils. ([f216cdd](https://github.com/gnucoop/ajf/commit/f216cddd65555936f7828fa69dbe8f18f4e3236b))
* **core/report:** add single indicator widget in xls report ([afdfb11](https://github.com/gnucoop/ajf/commit/afdfb113f9759df30432d92c7f761ae521e56e18))
* **core/reports/automatic-report:** Added sum and standard deviation widgets. Formula fieldTypes are now treated as number fieldTypes. ([8cd6f9a](https://github.com/gnucoop/ajf/commit/8cd6f9a35a031185dfd6aac8d70d221879e8a479))
* **core/reports:** add export all report widgets function ([71949e2](https://github.com/gnucoop/ajf/commit/71949e2d4cbde412112311a5a97e4b4a325d5a9b))
* **core/reports:** add parameter 'header' to report printing functions to enable printing of report metrics ([03a4957](https://github.com/gnucoop/ajf/commit/03a49573733b018ecfebda39065a3e96007e7a01))
* **core/reports:** align attribute in html text widget ([21f5a4c](https://github.com/gnucoop/ajf/commit/21f5a4cfadbbbd24b1bb6f14ba4698cd67f20314))
* **core/reports:** charts cleanup and restyling ([13fed4f](https://github.com/gnucoop/ajf/commit/13fed4ff51cea5eda1ad723dde567cc853325e86))
* **core/reports:** docx printing of html tags in text widgets ([3baf2d2](https://github.com/gnucoop/ajf/commit/3baf2d2a0c1617fde7a5c4b7e22718473d10b9e5))
* **core/reports:** download reports as docx files ([0ed23d8](https://github.com/gnucoop/ajf/commit/0ed23d853d87a854abbd42cb4b26185395eeeda6))
* **core/reports:** export all exportable widgets in columns and layout ([4d7dc7b](https://github.com/gnucoop/ajf/commit/4d7dc7bdb337bac6ce51a4b0ec1b6993f9a66276))
* **core/reports:** implement scatter and bubble charts in xlsreport ([6ada13e](https://github.com/gnucoop/ajf/commit/6ada13e0e3958f44be0b52dccbd1785f5c336bf6))
* **core/reports:** xlsreport chart options ([02e3c77](https://github.com/gnucoop/ajf/commit/02e3c77509c7377ab3d383460335e480bc9b0294))
* **core/signature:** Added core class AjfSignature and SignatureType. ([d6e023b](https://github.com/gnucoop/ajf/commit/d6e023b76c7eca06677e71208a8524fc339a4ae0))
* **dev-app:** Added Signature field to Dev App demo. ([ead4455](https://github.com/gnucoop/ajf/commit/ead44551434b4c365e4109b8ec26b8ab8d463677))
* **forms:** docx printing of signature fields ([2d1ca2d](https://github.com/gnucoop/ajf/commit/2d1ca2daab4263db95fe563fd248c138456f5e39))
* **forms:** pdf printing of signature fields ([a26ded8](https://github.com/gnucoop/ajf/commit/a26ded8ca7063aed67944e5a9cf03ba68a3b718e))
* **material/form-builder:** Added Signature Field to Form Builder. Added readonly flag to form builder field properties. ([b7e4e39](https://github.com/gnucoop/ajf/commit/b7e4e39525d5e5081d2f417fd30cb2d74495c124))
* **material/forms:** Added Signature Field to material forms module and field-service. ([fe4abdf](https://github.com/gnucoop/ajf/commit/fe4abdf7df65c68cd9c322a72033a16543cc01a2))
* **material/forms:** replace ajf-icons with material icons ([105ad5d](https://github.com/gnucoop/ajf/commit/105ad5d3905742909bfc2a58b4889b9bbc7b7aa0))
* **material/forms:** search filter for choice fields ([4319fe1](https://github.com/gnucoop/ajf/commit/4319fe1206e8ffdce1b09368f45e2ba50663c050))
* **material/report:** Added mainDataNumberThreshold input to chart-widget. Defaults to 10. ([f712e11](https://github.com/gnucoop/ajf/commit/f712e1164540342cfef16ca0e1bc5aa2639f0d54))
* **material/signature:** Added Material Signature module and component. ([4b3ea1b](https://github.com/gnucoop/ajf/commit/4b3ea1b4e157a93d252d1957058afde78c47beed))

<!-- CHANGELOG SPLIT MARKER -->

<a name="16.0.4"></a>
# 16.0.4 "scornful-hyena" (2024-06-26)
### Bug Fixes
* **core/forms:** enable cascade formula fields: remove context modification to enable valuechanges on formula update ([a48687a](https://github.com/gnucoop/ajf/commit/a48687ae1a64904e848cf8fc42055b5d4d6b5dc9))
* **core/reports:** fix xlsx export of tables with null cells ([43e3de6](https://github.com/gnucoop/ajf/commit/43e3de6ada0bc3400e2866ece6f0f13e3a6af2e4))
* **core/reports:** improve formulas for repeating slides in autoreports ([d89f8a2](https://github.com/gnucoop/ajf/commit/d89f8a26125023879be72f0f2853f222af9bcc87))

<!-- CHANGELOG SPLIT MARKER -->

<a name="16.0.3"></a>
# 16.0.3 "dependent-donkey" (2024-06-07)
### Features
* **core/reports:** charts cleanup and restyling ([13fed4f](https://github.com/gnucoop/ajf/commit/13fed4ff51cea5eda1ad723dde567cc853325e86))

<!-- CHANGELOG SPLIT MARKER -->

<a name="16.0.2"></a>
# 16.0.2 "managerial-sloth" (2024-06-07)

<!-- CHANGELOG SPLIT MARKER -->

<a name="16.0.1"></a>
# 16.0.1 "combined-pelican" (2024-05-27)
### Bug Fixes
* **core/reports:** autoreport restyling ([a20022a](https://github.com/gnucoop/ajf/commit/a20022a74bac6173226214dcf1e879ba3f9df8fe))
* **core/reports:** autoreport small fix ([0cd4c36](https://github.com/gnucoop/ajf/commit/0cd4c3639a0bd5fb46a837ea095e04d5e923e359))
### Features
* **core/reports:** add parameter 'header' to report printing functions to enable printing of report metrics ([03a4957](https://github.com/gnucoop/ajf/commit/03a49573733b018ecfebda39065a3e96007e7a01))

<!-- CHANGELOG SPLIT MARKER -->

<a name="16.0.0"></a>
# 16.0.0 "passing-mosquito" (2024-05-10)
### Bug Fixes
* **core/forms:** form-renderer: rollback flatNodes in withLatestFrom and force a valueChange when flatNodes are ready, to start the initialisation flow ([8b7a90b](https://github.com/gnucoop/ajf/commit/8b7a90b81cdf77eff079af8731f8978e1128c52e))
* **core/forms:** set default value when field or slide visibility changed ([958dd7c](https://github.com/gnucoop/ajf/commit/958dd7cd5a842b4c273096105d121cb46ab44684))
* **core/forms:** set reps values in formgroup after visibility update ([c81fa53](https://github.com/gnucoop/ajf/commit/c81fa5364e2e67402314fbfd052e7e217743abba))
* **core/reports:** fix xlsreport charts size and proportions ([a472c49](https://github.com/gnucoop/ajf/commit/a472c49aa6084daff8317dc95481b5feca7baa34))
* **core/reports:** null check in printing of report tables ([5d7b80b](https://github.com/gnucoop/ajf/commit/5d7b80bdfd1b69e13e091fd5738298305262edfa))
* **core/utils:** Deep-copy functionDeserializer type issue in array.concat argument. ([eeed45d](https://github.com/gnucoop/ajf/commit/eeed45d6f7c0e8448a615078493bb231311d73e7))
* **material/form-builder:** Added forwardRef to childEntries queryList. ([c0a3cc1](https://github.com/gnucoop/ajf/commit/c0a3cc1dea923c46a0f5804745fffae0c1cf5882))
* **material/form-builder:** Fixed a css issue causing Properties to disappear when title/visibility condition are too long. ([e0b9316](https://github.com/gnucoop/ajf/commit/e0b9316cd09d76a9aeb6f256eb8cab78c96bb865))
* **material/formbuilder:** Small css fixes to visibility condition overflow and formtree properties. ([f8552e2](https://github.com/gnucoop/ajf/commit/f8552e2e2615f232a476e9ecc3d3a56f7678f0c8))
* **material/forms:** fix choice fields with filter ([ff54e91](https://github.com/gnucoop/ajf/commit/ff54e913e05b54c851ce9b94e3b866591e39eac7))
* **material/forms:** remove validity icon from slide tab when slide is not visible ([0b38e7b](https://github.com/gnucoop/ajf/commit/0b38e7b8840be99d907bbfafecd6eb4b419e049c))
### Features
* **core/forms:** download forms as docx ([e1f2db5](https://github.com/gnucoop/ajf/commit/e1f2db59ba9f27209ecac68422c2e6e71269ebac))
* **forms:** docx printing of signature fields ([2d1ca2d](https://github.com/gnucoop/ajf/commit/2d1ca2daab4263db95fe563fd248c138456f5e39))
* **forms:** pdf printing of signature fields ([a26ded8](https://github.com/gnucoop/ajf/commit/a26ded8ca7063aed67944e5a9cf03ba68a3b718e))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.3.14"></a>
# 15.3.14 "pale-meerkat" (2024-04-23)
### Bug Fixes
* **core/forms:** form-renderer: rollback flatNodes in withLatestFrom and force a valueChange when flatNodes are ready, to start the initialisation flow ([8b7a90b](https://github.com/gnucoop/ajf/commit/8b7a90b81cdf77eff079af8731f8978e1128c52e))
### Features
* **forms:** docx printing of signature fields ([2d1ca2d](https://github.com/gnucoop/ajf/commit/2d1ca2daab4263db95fe563fd248c138456f5e39))
* **forms:** pdf printing of signature fields ([a26ded8](https://github.com/gnucoop/ajf/commit/a26ded8ca7063aed67944e5a9cf03ba68a3b718e))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.3.13"></a>
# 15.3.13 "invisible-swallow" (2024-03-21)
### Bug Fixes
* **core/forms:** set default value when field or slide visibility changed ([958dd7c](https://github.com/gnucoop/ajf/commit/958dd7cd5a842b4c273096105d121cb46ab44684))
* **core/reports:** fix xlsreport charts size and proportions ([a472c49](https://github.com/gnucoop/ajf/commit/a472c49aa6084daff8317dc95481b5feca7baa34))
* **material/form-builder:** Fixed a css issue causing Properties to disappear when title/visibility condition are too long. ([e0b9316](https://github.com/gnucoop/ajf/commit/e0b9316cd09d76a9aeb6f256eb8cab78c96bb865))
### Features
* **core/forms:** download forms as docx ([e1f2db5](https://github.com/gnucoop/ajf/commit/e1f2db59ba9f27209ecac68422c2e6e71269ebac))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.3.12"></a>
# 15.3.12 "electric-silverfish" (2024-02-26)
### Bug Fixes
* **core/forms:** set reps values in formgroup after visibility update ([c81fa53](https://github.com/gnucoop/ajf/commit/c81fa5364e2e67402314fbfd052e7e217743abba))
* **material/formbuilder:** Small css fixes to visibility condition overflow and formtree properties. ([f8552e2](https://github.com/gnucoop/ajf/commit/f8552e2e2615f232a476e9ecc3d3a56f7678f0c8))
* **material/forms:** fix choice fields with filter ([ff54e91](https://github.com/gnucoop/ajf/commit/ff54e913e05b54c851ce9b94e3b866591e39eac7))
* **material/forms:** remove validity icon from slide tab when slide is not visible ([0b38e7b](https://github.com/gnucoop/ajf/commit/0b38e7b8840be99d907bbfafecd6eb4b419e049c))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.3.11"></a>
# 15.3.11 "wasteful-lemming" (2024-02-14)
### Bug Fixes
* **material/forms:** fix choice fields with few choices ([8ad4a8c](https://github.com/gnucoop/ajf/commit/8ad4a8c207f6dee4965e6e8ac58efa8aed8d6d25))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.3.10"></a>
# 15.3.10 "economic-salmon" (2024-02-14)
### Bug Fixes
* **core/forms:** pdf printing of repeating slide number starts at 1 ([a464783](https://github.com/gnucoop/ajf/commit/a46478354184dc87e16c1d402826cb9a379494bf))
* **core/reports:** fix FROM_REPS function ([992f9cf](https://github.com/gnucoop/ajf/commit/992f9cf01f26712b977199019b4167ef532d2223))
### Features
* **core/reports:** align attribute in html text widget ([21f5a4c](https://github.com/gnucoop/ajf/commit/21f5a4cfadbbbd24b1bb6f14ba4698cd67f20314))
* **material/forms:** search filter for choice fields ([4319fe1](https://github.com/gnucoop/ajf/commit/4319fe1206e8ffdce1b09368f45e2ba50663c050))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.3.9"></a>
# 15.3.9 "jolly-salamander" (2024-01-23)
### Bug Fixes
* **core/range:** set correct value for range slider when min or max change ([4c5b368](https://github.com/gnucoop/ajf/commit/4c5b368721b6e54d29b8980f913ed724f1ed03cf))
* **core/reports:** xlsreport charts various fixes ([a7e564a](https://github.com/gnucoop/ajf/commit/a7e564a4897c6c520196ab14e9bdf43cd7e5ed03))
* **material/form-builder:** set max width for very long formulae ([cb42fe4](https://github.com/gnucoop/ajf/commit/cb42fe46860f0b41a782bb975322a61dedeb369c))
### Features
* **core/reports:** docx printing of html tags in text widgets ([3baf2d2](https://github.com/gnucoop/ajf/commit/3baf2d2a0c1617fde7a5c4b7e22718473d10b9e5))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.3.8"></a>
# 15.3.8 "provincial-tiger" (2023-12-04)
### Bug Fixes
* **core/forms:** add all info when create a new validation ([cd1572f](https://github.com/gnucoop/ajf/commit/cd1572f282d66154144488efb4c714e3c5912738))
* **core/forms:** validation message will always be updated by the pipeline on multiple conditions ([f8723cf](https://github.com/gnucoop/ajf/commit/f8723cf1397b28c8df2a5607cdb9322ce13291b2))
* **core/reports:** fix docx library inclusion ([cf56b42](https://github.com/gnucoop/ajf/commit/cf56b4233f7129f9272faafd3ce236895858ecfc))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.3.7"></a>
# 15.3.7 "interesting-bird" (2023-11-29)
### Bug Fixes
* **core/transloco:** modified some spanish translations ([dc3819f](https://github.com/gnucoop/ajf/commit/dc3819fd079c6e30986f46469ad113229bc98630))
### Features
* **core/reports:** download reports as docx files ([0ed23d8](https://github.com/gnucoop/ajf/commit/0ed23d853d87a854abbd42cb4b26185395eeeda6))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.3.6"></a>
# 15.3.6 "conservative-barracuda" (2023-11-09)
### Bug Fixes
* **core/forms:** combine form init event with flat nodes ([94311da](https://github.com/gnucoop/ajf/commit/94311da6b343d01f8f57ee288e2ccef317125215))
* **material/form-builder:** fix formbuilder sticky bar ([af21ea4](https://github.com/gnucoop/ajf/commit/af21ea48c79f844c54880799fac245a67273a2ae))
### Features
* **core/reports:** xlsreport chart options ([02e3c77](https://github.com/gnucoop/ajf/commit/02e3c77509c7377ab3d383460335e480bc9b0294))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.3.5"></a>
# 15.3.5 "nearby-hoverfly" (2023-10-30)
### Features
* **core/reports:** implement scatter and bubble charts in xlsreport ([6ada13e](https://github.com/gnucoop/ajf/commit/6ada13e0e3958f44be0b52dccbd1785f5c336bf6))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.3.4"></a>
# 15.3.4 "tight-llama" (2023-10-16)
### Bug Fixes
* **core/forms:** prints date even when formcontrol changes ([1a61104](https://github.com/gnucoop/ajf/commit/1a6110433d39e75316b155e4486b482da270e603))
* **core/reports:** fix and test APPLY_LABELS function ([aa86918](https://github.com/gnucoop/ajf/commit/aa869185c3eb27fa8c2d2c3177ea02308fc79bdd))
* **material/form-builder:** Fixed a bug causing ChoicesOriginRef not to be updated when a Choices Origin is edited. ([d3d4428](https://github.com/gnucoop/ajf/commit/d3d4428a522e8cbaf99aef3e94dc9cdfc03c0a9e))
* **material/form-builder:** Save in properties is now disabled if name or label field are empty. ([a638fd4](https://github.com/gnucoop/ajf/commit/a638fd40cc5bf971714739c15811d79ed5c4948e))
* **material/forms:** add padding-top for range tooltip ([79d1885](https://github.com/gnucoop/ajf/commit/79d1885479adb9d59ee03b8fea288804473546c2))
### Features
* **core/forms:** add range field available in form-to-pdf ([01d2091](https://github.com/gnucoop/ajf/commit/01d20917d95fe5ba923fac6c556ada5f7bcc046b))
* **core/forms:** Added Signature field and field type. ([cb700ec](https://github.com/gnucoop/ajf/commit/cb700ec9142df4dc424c0012e1ff707cb9f996e1))
* **core/reports:** add export all report widgets function ([71949e2](https://github.com/gnucoop/ajf/commit/71949e2d4cbde412112311a5a97e4b4a325d5a9b))
* **core/reports:** export all exportable widgets in columns and layout ([4d7dc7b](https://github.com/gnucoop/ajf/commit/4d7dc7bdb337bac6ce51a4b0ec1b6993f9a66276))
* **core/signature:** Added core class AjfSignature and SignatureType. ([d6e023b](https://github.com/gnucoop/ajf/commit/d6e023b76c7eca06677e71208a8524fc339a4ae0))
* **dev-app:** Added Signature field to Dev App demo. ([ead4455](https://github.com/gnucoop/ajf/commit/ead44551434b4c365e4109b8ec26b8ab8d463677))
* **material/form-builder:** Added Signature Field to Form Builder. Added readonly flag to form builder field properties. ([b7e4e39](https://github.com/gnucoop/ajf/commit/b7e4e39525d5e5081d2f417fd30cb2d74495c124))
* **material/forms:** Added Signature Field to material forms module and field-service. ([fe4abdf](https://github.com/gnucoop/ajf/commit/fe4abdf7df65c68cd9c322a72033a16543cc01a2))
* **material/signature:** Added Material Signature module and component. ([4b3ea1b](https://github.com/gnucoop/ajf/commit/4b3ea1b4e157a93d252d1957058afde78c47beed))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.3.3"></a>
# 15.3.3 "rich-bovid" (2023-10-06)
### Bug Fixes
* **core/forms:** prints date even when formcontrol changes ([1a61104](https://github.com/gnucoop/ajf/commit/1a6110433d39e75316b155e4486b482da270e603))
* **core/reports:** fix and test APPLY_LABELS function ([aa86918](https://github.com/gnucoop/ajf/commit/aa869185c3eb27fa8c2d2c3177ea02308fc79bdd))
* **material/form-builder:** Fixed a bug causing ChoicesOriginRef not to be updated when a Choices Origin is edited. ([d3d4428](https://github.com/gnucoop/ajf/commit/d3d4428a522e8cbaf99aef3e94dc9cdfc03c0a9e))
### Features
* **core/reports:** add export all report widgets function ([71949e2](https://github.com/gnucoop/ajf/commit/71949e2d4cbde412112311a5a97e4b4a325d5a9b))
* **core/reports:** export all exportable widgets in columns and layout ([4d7dc7b](https://github.com/gnucoop/ajf/commit/4d7dc7bdb337bac6ce51a4b0ec1b6993f9a66276))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.3.2"></a>
# 15.3.2 "brave-elephant" (2023-09-05)

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.3.1"></a>
# 15.3.1 "mathematical-shrew" (2023-09-05)

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.3.0"></a>
# 15.3.0 "willing-hyena" (2023-09-04)
### Bug Fixes
* **core/barcode:** Fixed a bug caused by a missing undefined check on the barcode video element when resetting or stopping streams. ([111c647](https://github.com/gnucoop/ajf/commit/111c6476916c3ba420fe8e9756dd71d9186fe26c))
* **core/reports:** Add css for single indicator widget ([886ce13](https://github.com/gnucoop/ajf/commit/886ce13b9c83546669959f0a1d5aabad23259d7f))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.2.6"></a>
# 15.2.6 "parental-pike" (2023-08-01)
### Bug Fixes
* **core/forms:** remove orientation changer in page slider ([1251ab6](https://github.com/gnucoop/ajf/commit/1251ab6ad79d6c5089d50cf3507ac4c4932745ce))
* **material/forms:** fix bug with form builder icons ([6e3f24b](https://github.com/gnucoop/ajf/commit/6e3f24b8bb62ec64c762945c37e447e93978be2f))
* **material/forms:** fix page slider wheel event ([2ff6e00](https://github.com/gnucoop/ajf/commit/2ff6e00e389cb565b664a67c92a75dd52d3a608b))
### Features
* **material/forms:** replace ajf-icons with material icons ([105ad5d](https://github.com/gnucoop/ajf/commit/105ad5d3905742909bfc2a58b4889b9bbc7b7aa0))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.2.5"></a>
# 15.2.5 "respective-whale" (2023-07-07)
### Bug Fixes
* **core/forms:** notEmptyMessage reimplemented in retro-compatible way ([c3b9f94](https://github.com/gnucoop/ajf/commit/c3b9f94b314e01a73d625fb5ef106e43a738168b))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.2.4"></a>
# 15.2.4 "wonderful-butterfly" (2023-07-06)
### Bug Fixes
* **core/forms:** change readonly data field format based on language ([60bccbc](https://github.com/gnucoop/ajf/commit/60bccbc18474e31fd795d21855c9270d626ab6db))
* **material/form-builder:** Fixed various bugs (Could not add new slides, could not save Hints etc.). ([3cf94a8](https://github.com/gnucoop/ajf/commit/3cf94a88d03ba42659155872aef24749c9d78acc))
### Features
* **core/forms:** customizable notEmpty message ([eda13f5](https://github.com/gnucoop/ajf/commit/eda13f54548d312579045848a5eeb0180b0071a2))
* **core/report:** add single indicator widget in xls report ([afdfb11](https://github.com/gnucoop/ajf/commit/afdfb113f9759df30432d92c7f761ae521e56e18))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.2.3"></a>
# 15.2.3 "psychological-gecko" (2023-06-15)
### Bug Fixes
* **core/reports:** fix date functions ([17b5e98](https://github.com/gnucoop/ajf/commit/17b5e98f3a1e2955ff92a0d40c02c964461e4a9a))
* **material/forms:** add translation for error messages ([af26549](https://github.com/gnucoop/ajf/commit/af26549724e0fd58c2e89105ab48afa06685997d))
### Features
* **core/reports:** CONSOLE_LOG returns the value to be logged ([c37c974](https://github.com/gnucoop/ajf/commit/c37c974028359b93497815dd2ff769e97c86cc22))
* **material/forms:** Add geolocation field ([f0f3313](https://github.com/gnucoop/ajf/commit/f0f331381173480375aa63eab60965116524ef3c))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.2.2"></a>
# 15.2.2 "weird-cockroach" (2023-05-23)

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.2.1"></a>
# 15.2.1 "confidential-shark" (2023-05-22)
### Bug Fixes
* **core/reports:** make reports responsive ([c96d3d5](https://github.com/gnucoop/ajf/commit/c96d3d54425cd48c1b6a353298c4f540eaa362fe))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.2.0"></a>
# 15.2.0 "everyday-kangaroo" (2023-05-04)
### Bug Fixes
* **core/reports:** evaluateExpression stops messing with predefined identifiers ([7e7306e](https://github.com/gnucoop/ajf/commit/7e7306e65091358e14dab0e381808a2035fa69ba))
* **core/reports:** fix first and last functions ([6af2d3f](https://github.com/gnucoop/ajf/commit/6af2d3f32120e0a51706f77f7dcd82db89015eaf))
* **core/reports:** use non-strict equality in indicators language ([c33aa93](https://github.com/gnucoop/ajf/commit/c33aa93e865a6d3bbe70ffcf72ab4f6885541469))
### Features
* **core/forms:** Added Pipe that returns a string with all validation errors of a FieldInstance. ([3947d75](https://github.com/gnucoop/ajf/commit/3947d759725edd780d5cf4bec1874d052bf8fcca))
* **material/forms:** AjfForm new "card" UI. Added "centeredFieldsContent" and "maxColumns" inputs to form. ([38a0bb7](https://github.com/gnucoop/ajf/commit/38a0bb75b6f6459a266e00b7f8a379e10344596a))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.1.5"></a>
# 15.1.5 "royal-weasel" (2023-04-11)
### Bug Fixes
* **core/reports:** fix expression utils function signatures ([897b924](https://github.com/gnucoop/ajf/commit/897b924709cb4b48bedfc497ce090897c0a19fc5))
### Features
* **core/reports:** xlsreport date functions ([8fce741](https://github.com/gnucoop/ajf/commit/8fce7411d4f8bc578d18aacdc49fd00875d0cee4))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.1.4"></a>
# 15.1.4 "stale-rabbit" (2023-03-29)
### Bug Fixes
* **core/reports:** fix expression utils function signatures ([897b924](https://github.com/gnucoop/ajf/commit/897b924709cb4b48bedfc497ce090897c0a19fc5))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.1.3"></a>
# 15.1.3 "past-earthworm" (2023-03-22)
### Bug Fixes
* **core/forms:** format date values in form renderer ([77b1e70](https://github.com/gnucoop/ajf/commit/77b1e70d1276a1126f08d25056ab164660609eed))
* **core/models:** remove forceFormula from evaluateExpression ([d0952ec](https://github.com/gnucoop/ajf/commit/d0952eca98f891f672d627e18d34dee87442b349))
* **core/reports:** expression utils small fixes ([fe805a1](https://github.com/gnucoop/ajf/commit/fe805a1fb48fd7a2505bdd4406f301fe326aa92c))
* **core/reports:** IF_THEN_ELSE renamed to IF ([4dd3ef4](https://github.com/gnucoop/ajf/commit/4dd3ef44f6e8cd73f0f651b551726f5c729f184d))
* **core/utils:** format date values in the deepCopy of a form ([8cd3566](https://github.com/gnucoop/ajf/commit/8cd35664c4f7a4d7f17cbf853d66cfa46abe54b7))
* **material/forms:** lint ([90d6357](https://github.com/gnucoop/ajf/commit/90d635757da21e41a317847ae477b928a9c633f5))
### Features
* **core/transloco:** add arabic language ([9aee359](https://github.com/gnucoop/ajf/commit/9aee3592d2690a710adc2eeeca55baad8e2797a6))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.1.2"></a>
# 15.1.2 "modern-parakeet" (2023-03-17)
### Bug Fixes
* **core/reports:** fix repeat function ([1ed9ad4](https://github.com/gnucoop/ajf/commit/1ed9ad4d3fcf2eb9d555d37632921d3542b44bc5))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.1.1"></a>
# 15.1.1 "decisive-mammal" (2023-03-16)
### Bug Fixes
* **core/reports:** fix e2e test ([9773fbd](https://github.com/gnucoop/ajf/commit/9773fbd20283222ab9c6035bb228801cf7aa3e21))
* **core/reports:** lint ([8dc334b](https://github.com/gnucoop/ajf/commit/8dc334b81a536294d33ea8a80c58d5e2774395f2))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.1.0"></a>
# 15.1.0 "definite-primate" (2023-03-16)
### Bug Fixes
* Changed sourceRoot in angular.json for all libraries ([992a702](https://github.com/gnucoop/ajf/commit/992a702b6ace14e84bdb96103cb027ec2f68e238))
* **core/reports:** enable variables in indicator expressions ([82c8c14](https://github.com/gnucoop/ajf/commit/82c8c14eda01b8eaddf192af7ec1c662d2a57b6f))
* **core/reports:** fix more expression utils functions ([3209b56](https://github.com/gnucoop/ajf/commit/3209b56f235fa3c460512a3cc5a3bb35cefd6046))
* **core/reports:** fix xlsreport errors row number ([97bbdd4](https://github.com/gnucoop/ajf/commit/97bbdd49ea04fc3c10c5bafb3664759f2f6887c2))
* **core/reports:** improve expression utils API and performance ([fe3e277](https://github.com/gnucoop/ajf/commit/fe3e2778e0c5cd9ba5c91d37e370949e53c6e3b6))
* **material/forms:** Added Datepicker to Date-input-field ([281a191](https://github.com/gnucoop/ajf/commit/281a191d4c2ca3f3755b125a4963f318d292a7be))
* **material/forms:** Range Field template fix (formContol directive missing in input) ([db8f7f3](https://github.com/gnucoop/ajf/commit/db8f7f3a401ef37935aa425f39478178abbb4927))
### Features
* **core/material/forms:** Added visual cues and UI improvements for repeating slides in ajf topbar of Page Slider. ([148b64b](https://github.com/gnucoop/ajf/commit/148b64b574ca3a4261e5d7d82034c8100128a3cd))

<!-- CHANGELOG SPLIT MARKER -->

<a name="15.0.1"></a>
# 15.0.1 "cool-possum" (2023-02-28)
### Bug Fixes
* Changed sourceRoot in angular.json for all libraries ([992a702](https://github.com/gnucoop/ajf/commit/992a702b6ace14e84bdb96103cb027ec2f68e238))
* **material/forms:** Added Datepicker to Date-input-field ([281a191](https://github.com/gnucoop/ajf/commit/281a191d4c2ca3f3755b125a4963f318d292a7be))
* **material/forms:** Range Field template fix (formContol directive missing in input) ([db8f7f3](https://github.com/gnucoop/ajf/commit/db8f7f3a401ef37935aa425f39478178abbb4927))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.2.15"></a>
# 13.2.15 "breakable-mole" (2023-02-21)
### Bug Fixes
* **core/forms:** add null check before reset value ([7b64348](https://github.com/gnucoop/ajf/commit/7b643480d3a800a1225515a6c8d231fdc977fd94))
* **core/model:** fix decimals for sum between floats ([a786c1f](https://github.com/gnucoop/ajf/commit/a786c1fa070d3b4fae2fd4b4670bb797c61fa9a6))
* **core/model:** fix SUM and APPLY_LABELS report functions ([f4703c5](https://github.com/gnucoop/ajf/commit/f4703c5a5f0d4c0b3166fc3f0c4d2d2664496cc2))
* **core/models:** filter dataset from null forms ([309ad0d](https://github.com/gnucoop/ajf/commit/309ad0dc96d60b4ad1579c840d0ce46f809b7072))
* **core/models:** fix report build dataset function for table fields ([5675da4](https://github.com/gnucoop/ajf/commit/5675da4ae1a0eb9856bb34fb7ce5b865228b9511))
* **core/models:** SUM function fixed for repeating slide ([863d531](https://github.com/gnucoop/ajf/commit/863d53146f44414d228112f4d23bcec5fae5d15a))
* **core/reports:** fix some expression utils functions ([9320297](https://github.com/gnucoop/ajf/commit/9320297fc6169e6af5ade3ce4cdcf6212458264d))
* **core/reports:** paginated dynamic table should be exportable ([cf182f6](https://github.com/gnucoop/ajf/commit/cf182f642da84298f3308202b78c04ff8ef8793a))
* **core/table:** fixed^Corting on table columns ([8701be1](https://github.com/gnucoop/ajf/commit/8701be1daa2ecfdcf0750a74b4818e2412cf5c68))
* **material/forms:** add header in readonly table and fix cell height ([6ad5ce2](https://github.com/gnucoop/ajf/commit/6ad5ce252fd61c5a2185047469e30d4ff7d253bb))
### Features
* **core/forms:** accept formula in defaultValue ([a7295b8](https://github.com/gnucoop/ajf/commit/a7295b82809514212db539bd69445ba79c15da3a))
* **core/forms:** evaluate formula for defaultValue only when field is visible ([2a3eddb](https://github.com/gnucoop/ajf/commit/2a3eddbb472940efc0f9425d014d0fce68e6e9b4))
* **core/reports:** add new widget for paginated tables ([14c6241](https://github.com/gnucoop/ajf/commit/14c62411860a1f96f6557bf3e01bde5a657417b9))
* **core/reports:** select in xlsreport wich columns should be sortable ([755165a](https://github.com/gnucoop/ajf/commit/755165a4d2c37f3ddc27dfa4fa3d2ef02854afd1))
* **core/reports:** xlsreport: new array functions ([33b4420](https://github.com/gnucoop/ajf/commit/33b4420a5b77ff18a3ac49580d9e83d9455934a1))
* **core/table:** add sort in table ([46b752b](https://github.com/gnucoop/ajf/commit/46b752ba103c547ef8e00867d0993b98fda45c2d))
* **material/forms:** range value in form always visible ([197406e](https://github.com/gnucoop/ajf/commit/197406eec900f0b5f13541b5d2549fb446912db7))
* **material/reports:** add optional dialog with form fields values for table rows ([1eb819c](https://github.com/gnucoop/ajf/commit/1eb819c472fa0220cd22fe97247f5da99b4e4b85))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.2.14"></a>
# 13.2.14 "silent-capybara" (2023-02-14)
### Bug Fixes
* **core/forms:** add null check before reset value ([7b64348](https://github.com/gnucoop/ajf/commit/7b643480d3a800a1225515a6c8d231fdc977fd94))
* **core/models:** fix report build dataset function for table fields ([5675da4](https://github.com/gnucoop/ajf/commit/5675da4ae1a0eb9856bb34fb7ce5b865228b9511))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.2.13"></a>
# 13.2.13 "wispy-alligator" (2022-12-27)

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.2.12"></a>
# 13.2.12 "joint-possum" (2022-12-23)
### Bug Fixes
* **core/model:** fix decimals for sum between floats ([a786c1f](https://github.com/gnucoop/ajf/commit/a786c1fa070d3b4fae2fd4b4670bb797c61fa9a6))
### Features
* **core/forms:** accept formula in defaultValue ([a7295b8](https://github.com/gnucoop/ajf/commit/a7295b82809514212db539bd69445ba79c15da3a))
* **core/forms:** evaluate formula for defaultValue only when field is visible ([2a3eddb](https://github.com/gnucoop/ajf/commit/2a3eddbb472940efc0f9425d014d0fce68e6e9b4))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.2.11"></a>
# 13.2.11 "brief-harrier" (2022-11-11)
### Bug Fixes
* **core/models:** SUM function fixed for repeating slide ([863d531](https://github.com/gnucoop/ajf/commit/863d53146f44414d228112f4d23bcec5fae5d15a))
* **core/reports:** paginated dynamic table should be exportable ([cf182f6](https://github.com/gnucoop/ajf/commit/cf182f642da84298f3308202b78c04ff8ef8793a))
### Features
* **core/reports:** select in xlsreport wich columns should be sortable ([755165a](https://github.com/gnucoop/ajf/commit/755165a4d2c37f3ddc27dfa4fa3d2ef02854afd1))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.2.10"></a>
# 13.2.10 "voluminous-goldfish" (2022-10-25)
### Bug Fixes
* **material/forms:** add header in readonly table and fix cell height ([6ad5ce2](https://github.com/gnucoop/ajf/commit/6ad5ce252fd61c5a2185047469e30d4ff7d253bb))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.2.9"></a>
# 13.2.9 "deaf-lion" (2022-10-21)
### Bug Fixes
* **core/table:** fixed^Corting on table columns ([8701be1](https://github.com/gnucoop/ajf/commit/8701be1daa2ecfdcf0750a74b4818e2412cf5c68))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.2.8"></a>
# 13.2.8 "popular-shrew" (2022-09-30)
### Bug Fixes
* **core/model:** fix SUM and APPLY_LABELS report functions ([f4703c5](https://github.com/gnucoop/ajf/commit/f4703c5a5f0d4c0b3166fc3f0c4d2d2664496cc2))
* **core/models:** filter dataset from null forms ([309ad0d](https://github.com/gnucoop/ajf/commit/309ad0dc96d60b4ad1579c840d0ce46f809b7072))
### Features
* **material/forms:** range value in form always visible ([197406e](https://github.com/gnucoop/ajf/commit/197406eec900f0b5f13541b5d2549fb446912db7))
* **material/reports:** add optional dialog with form fields values for table rows ([1eb819c](https://github.com/gnucoop/ajf/commit/1eb819c472fa0220cd22fe97247f5da99b4e4b85))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.2.7"></a>
# 13.2.7 "fortunate-barnacle" (2022-09-14)
### Features
* **core/reports:** add new widget for paginated tables ([14c6241](https://github.com/gnucoop/ajf/commit/14c62411860a1f96f6557bf3e01bde5a657417b9))
* **core/reports:** xlsreport: new array functions ([33b4420](https://github.com/gnucoop/ajf/commit/33b4420a5b77ff18a3ac49580d9e83d9455934a1))
* **core/table:** add sort in table ([46b752b](https://github.com/gnucoop/ajf/commit/46b752ba103c547ef8e00867d0993b98fda45c2d))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.2.6"></a>
# 13.2.6 "assistant-canid" (2022-09-06)
### Bug Fixes
* **core/reports:** export correct value for tables ([45351e5](https://github.com/gnucoop/ajf/commit/45351e5eb4a1468e80a3393866029d155e09d57d))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.2.5"></a>
# 13.2.5 "retail-flyingfish" (2022-09-06)
### Bug Fixes
* approve api change in core/chart and core/reports ([c2a01b9](https://github.com/gnucoop/ajf/commit/c2a01b9e8b97ef2a011a135f8c3eb838ef35006f))
* approve api changes in core forms ([9c23817](https://github.com/gnucoop/ajf/commit/9c23817c4b56829402b06802fe31a718d8cec110))
* **calendars/ethiopian:** fix month number in ethiopian pipe ([7805c31](https://github.com/gnucoop/ajf/commit/7805c31657fa898b057fa8afca1a2dae28f57936))
* **calendars:** missing months in ethiopian year view ([9a8aa8c](https://github.com/gnucoop/ajf/commit/9a8aa8ca69d56a7a307fe4599e56e8c6a9fab229))
* **core/calendars:** month bounds generation in iso mode ([d2f4d9a](https://github.com/gnucoop/ajf/commit/d2f4d9a3b4632f8bcd3db68918eb402fd6e5c40d))
* **core/calendar:** value not set with daily period objects ([571f7c1](https://github.com/gnucoop/ajf/commit/571f7c10ac38d41a8d3c42afcfef59d41c69f181))
* **core/chart:** Fixed chart pieceLabel assignment ([1a95372](https://github.com/gnucoop/ajf/commit/1a953725693bc045cae488172134cd1c1c9150e3))
* **core/chart:** remove unused chart piecelabel plugin ([2d4d49d](https://github.com/gnucoop/ajf/commit/2d4d49daf3271d2907a4372aa8e37c11e6dff150))
* **core/common:** buildStringIdentifier is not exported ([a34307b](https://github.com/gnucoop/ajf/commit/a34307bfa0bbd47a86320fa5c6247c8aa1c7a32a))
* **core/echarts:** make echarts module options required ([787f0e0](https://github.com/gnucoop/ajf/commit/787f0e082ad50ab457d8d1e8415e87d558fdc138))
* **core/file-input:** add missing param in content children decorators ([0e143a4](https://github.com/gnucoop/ajf/commit/0e143a4b97fee57198265d4c07f6ed83871de043))
* **core/file-input:** update angular form value on input reset ([84e535e](https://github.com/gnucoop/ajf/commit/84e535e87dbd1bf7c635685dd07dbf7d955d7939))
* **core/file-input:** use normal cursor when the value is not null ([dbc1888](https://github.com/gnucoop/ajf/commit/dbc1888ed2316a915e4cfa0638cbc18a86e02c57))
* **core/file-input:** value not set on file select ([13de9fb](https://github.com/gnucoop/ajf/commit/13de9fbfb1a451331563dac0e3dff2fef00927d2))
* **core/forms:** add default choiceorigins to schema when export form to pdf ([8632c9b](https://github.com/gnucoop/ajf/commit/8632c9be7e96c1abb0dcbd7fd5cfe643c830077a))
* **core/forms:** add label instead of value for field with choices into form string identifier ([da1711f](https://github.com/gnucoop/ajf/commit/da1711f446f640e12b331d81cd800de51a1298ce))
* **core/forms:** allows all primitive input types inside a table field table field ([7d62964](https://github.com/gnucoop/ajf/commit/7d629645652954b4a42199f960aae32a45eb42b8))
* **core/forms:** change NotEmpty validation to check also for empty string ([3e6d118](https://github.com/gnucoop/ajf/commit/3e6d1184a61fdd20b4ce42084d6874d5feb7f7af))
* **core/forms:** classes using Angular features need to be decorated ([b934078](https://github.com/gnucoop/ajf/commit/b93407817c2544d250f2597351094f9b0a1f0065))
* **core/forms:** fix FormSchema interface in form-to-pdf ([010eefb](https://github.com/gnucoop/ajf/commit/010eefb125d927bbb84626d4919cd0e743148e98))
* **core/forms:** fix values in form-to-pdf for single and multiple choices fields ([95d6998](https://github.com/gnucoop/ajf/commit/95d69989a05c8fc648bb175f3f7ee01851dddd6b))
* **core/forms:** form-to-pdf: fix printing of formula fields ([65fd4a7](https://github.com/gnucoop/ajf/commit/65fd4a71ea5c29d20142f9202c4a8ec18ef109f9))
* **core/forms:** hide file preview in read only mode w/ null value ([843e280](https://github.com/gnucoop/ajf/commit/843e28030aa487d1e471a9c8104dacbecc264cac))
* **core/forms:** hide image preview in read only mode w/ null value ([f645e0b](https://github.com/gnucoop/ajf/commit/f645e0b4c6b080215667b3e9ce7ee331f9e0f07a))
* **core/forms:** in table force value to number if type is number ([f2e2c39](https://github.com/gnucoop/ajf/commit/f2e2c399622f31f6e868ef8ec90406348d5effb9))
* **core/forms:** include missing templates in ng_module bazel target ([3489afd](https://github.com/gnucoop/ajf/commit/3489afd27677c986f2c2a807cf02e4915f46aac4))
* **core/forms:** initialize choices origin in form renderer ([ccecfe0](https://github.com/gnucoop/ajf/commit/ccecfe0ac573bd8c0f0c43ee6fbf7b211259170d))
* **core/forms:** Node serializer fromJson name assignment. ([0c562cd](https://github.com/gnucoop/ajf/commit/0c562cd85013f3e2cc9f1f6033336de89695ad3f))
* **core/forms:** remove cyclic imports ([70f7b33](https://github.com/gnucoop/ajf/commit/70f7b3385ee227215107555e37abbd19f5451565))
* **core/forms:** show labels for select fields when readonly ([ddac4e6](https://github.com/gnucoop/ajf/commit/ddac4e635f319ccf9a9c973769e39976d900bc9c))
* **core/forms:** slide validity is not correctly initialized ([84565de](https://github.com/gnucoop/ajf/commit/84565de27ecc266d02e66dec045f0ebdb45d2a0b))
* **core/forms:** trigger form state updates on group removal ([ae0c55d](https://github.com/gnucoop/ajf/commit/ae0c55d487bf3880bff691e2ba0839e320a86698))
* **core/forms:** unable to create node instance if no validation condition has been defined ([3c75245](https://github.com/gnucoop/ajf/commit/3c75245450d276679a52012e424373e3e3443afb))
* **core/forms:** update field instance state in init node.  ([44ebb8a](https://github.com/gnucoop/ajf/commit/44ebb8acf91eed8355ba1ad40604fcc659f9d982))
* **core/forms:** wrong max digits validation formula ([4a64ff2](https://github.com/gnucoop/ajf/commit/4a64ff2340dac232e79fc446f95772a5531083a0))
* **core/forms:** wrong max validation condition ([3d068b5](https://github.com/gnucoop/ajf/commit/3d068b555050f24842d01ea2292f168544917eb9))
* **core/graph:** fix svg-pan-zoom import ([921bd39](https://github.com/gnucoop/ajf/commit/921bd39bdf9cc631b7cce3bbd7787f430a04389c))
* **core/graph:** remove unused file ([319483b](https://github.com/gnucoop/ajf/commit/319483b639774ae5a37557ff7ad9f65f6fc923c6))
* **core/models:** accept string input in formatDate validation helper ([9229731](https://github.com/gnucoop/ajf/commit/922973173acfc336eee8159489f4615044464792))
* **core/models:** ALL_VALUES_OF is not extracting values from main forms ([3da14e6](https://github.com/gnucoop/ajf/commit/3da14e6c5f9af75f1418b06dd5756764ceb5be60))
* **core/models:** sort code identifiers ([6eb6093](https://github.com/gnucoop/ajf/commit/6eb6093912bd12300aa6aff87b54471a64a1ac2e))
* **core/range:** range field must call base class ngOnInit method ([11e0eed](https://github.com/gnucoop/ajf/commit/11e0eed46aa9ef80d712aed88801390c7eaa5d05))
* **core/report:** fix expression-utils functions ([32b4f31](https://github.com/gnucoop/ajf/commit/32b4f31b5b5e97dc17ca6777d33593441463b907))
* **core/reports:** add exportable attribute in table widget instance ([668cb08](https://github.com/gnucoop/ajf/commit/668cb085b7e2e92a048d53a7261917e1c730fa48))
* **core/reports:** AjfReport instance imported using current module name ([761c8f6](https://github.com/gnucoop/ajf/commit/761c8f6ef97d15ea3da843157462e8c74b72bc5f))
* **core/reports:** approve api change ([b3eb5e7](https://github.com/gnucoop/ajf/commit/b3eb5e7df94ff595605cece59a87187acd2ed30f))
* **core/reports:** chart.js plugin option formalae are not correctly evaluated ([626a10c](https://github.com/gnucoop/ajf/commit/626a10c852a5d1ea811a461e020bb39faa104150))
* **core/reports:** convert rows for table into plain array. Add new function for compare date. ([e3e1bf0](https://github.com/gnucoop/ajf/commit/e3e1bf02e48b2a4cd4b73648d196cd4f0ca073b9))
* **core/reports:** export also dynamic table widget both with rowspan or colspan ([60a2b4c](https://github.com/gnucoop/ajf/commit/60a2b4cd9517e75f37e1d703747ded0f854da7ef))
* **core/reports:** export correct value for tables ([45351e5](https://github.com/gnucoop/ajf/commit/45351e5eb4a1468e80a3393866029d155e09d57d))
* **core/reports:** fixed the export of the csv, now shows the value without the saveValue warning ([a5f7bbc](https://github.com/gnucoop/ajf/commit/a5f7bbc676d1e25af5016a4389b681c78eaa25fc))
* **core/reports:** hindikit: generalized function parsing ([2a60233](https://github.com/gnucoop/ajf/commit/2a602331718aebb6ed58c2168947e46af37d1401))
* **core/reports:** increase page size and fix printing of numbers in tables ([8f68a14](https://github.com/gnucoop/ajf/commit/8f68a14964e86b21c09fa7fb159c213d95e0702c))
* **core/reports:** missing props in heat map widget instance ([7ccd7d6](https://github.com/gnucoop/ajf/commit/7ccd7d6685ee9016b68bb488b8cb6454c1e749b7))
* **core/reports:** omit table header when empty ([6a7fc1a](https://github.com/gnucoop/ajf/commit/6a7fc1ae0731f5cce42b914cb6ad2e0baa6da29e))
* **core/reports:** translate table cells and chart labels ([8cc764f](https://github.com/gnucoop/ajf/commit/8cc764f51270a81481bf9942e59f930ac2dab742))
* **core/reports:** widget wrapper inside export container has zero height ([e34d940](https://github.com/gnucoop/ajf/commit/e34d94044084cbfad02f9a018bcd7c2f68ae5266))
* **core/reports:** widget.options misspell in widgetToWidgetInstance ([6c96a41](https://github.com/gnucoop/ajf/commit/6c96a41888ecd70c5588ea481593edc988d35dcd))
* **core/transloco:** add module forRoot function ([9112607](https://github.com/gnucoop/ajf/commit/9112607f3285647940aa324c303310faa50258bb))
* **core/transloco:** add prt and eth translations ([3896d22](https://github.com/gnucoop/ajf/commit/3896d220788ee9daf8b0507ed002e540ad7939cd))
* **core:** fix COUNT_FORMS_UNIQUE ([cab93d5](https://github.com/gnucoop/ajf/commit/cab93d5dfec9fe9d71f33d0be6f5e2175b373227))
* **dev-app:** ionic widgets demo layout ([c35c650](https://github.com/gnucoop/ajf/commit/c35c6504ee6c429077c719e2ce1a5bb83428d622))
* **dev-app:** report from form params ([9259640](https://github.com/gnucoop/ajf/commit/9259640b57a7681fa2c04b04c38610b451127388))
* **dev-app:** report from form set schema wrong params ([90e4539](https://github.com/gnucoop/ajf/commit/90e453955e3927930397470aac5921735ba91721))
* **forms:** formula fields must be readonly inputs ([93c2819](https://github.com/gnucoop/ajf/commit/93c2819c8231e990e3b1f3a30dc20275aa2a2408))
* **forms:** table field handling number input by ng if directive ([3794497](https://github.com/gnucoop/ajf/commit/379449705e09db113081aef59551d6689f29e55b))
* **form:** template ([da4f4df](https://github.com/gnucoop/ajf/commit/da4f4df6bb0d1f14d7f2d6435620039d85cf96b1))
* **ionic/forms:** add css for table fields ([1fba2b4](https://github.com/gnucoop/ajf/commit/1fba2b44a5e072b548182ab04646ae942f8c78bf))
* **ionic/forms:** render table header as text ([5accdfb](https://github.com/gnucoop/ajf/commit/5accdfbda94a3e05c5381591e8e1d0913d62a946))
* lint errors ([2380a0a](https://github.com/gnucoop/ajf/commit/2380a0a69dc7855a05b6fe51b424e34e287be657))
* **material/barcode:** file drop not working ([4fa778d](https://github.com/gnucoop/ajf/commit/4fa778d2d7b06638bce9da9fac23431dac95ebeb))
* **material/form-builder:** can't delete slides ([e1bc010](https://github.com/gnucoop/ajf/commit/e1bc0105ee9cad45d3d1672669e617552f46c384))
* **material/form-builder:** can't edit form starting from an empty schema ([830ba87](https://github.com/gnucoop/ajf/commit/830ba870569fa8fa041bd432e775045a3f3be12a))
* **material/form-builder:** choices origins are not correctly saved ([96ce906](https://github.com/gnucoop/ajf/commit/96ce9061945b4cbf95cc7594b42729a15028ef5d))
* **material/form-builder:** dnd from left bar difficult with long forms ([9ebf2a9](https://github.com/gnucoop/ajf/commit/9ebf2a9796f42a0a01a811a7b4a564c8f135c0cf))
* **material/form-builder:** formulae and conditions not updated in UI ([83a2ebb](https://github.com/gnucoop/ajf/commit/83a2ebba5098d09716d08cb7e2f9080553f50f6e))
* **material/form-builder:** messy code after cherry pick ([68f5205](https://github.com/gnucoop/ajf/commit/68f52058c5db2e0614cee8865143da84fc774dc9))
* **material/form-builder:** output form should not repeat choice values for every choice field ([7a25255](https://github.com/gnucoop/ajf/commit/7a252557190dda86debba9a90fb25dc569ab5b8c))
* **material/form-builder:** size and default value props are not saved ([f522cf3](https://github.com/gnucoop/ajf/commit/f522cf3a80e2bc728defd91cabc0476b223e2155))
* **material/form:** input field ([6dc1406](https://github.com/gnucoop/ajf/commit/6dc1406211e6609ad31769e67c6b249b43e1d1d0))
* **material/forms:** approve api change ([6e41ff8](https://github.com/gnucoop/ajf/commit/6e41ff869f8f02dfb39e6ddd0e3a6ddc0a0bc8f7))
* **material/forms:** date field uses an unexisting calendar selection mode ([5e2c6c6](https://github.com/gnucoop/ajf/commit/5e2c6c6146eb3135dd735fa750212af86ed245a7))
* **material/forms:** render table header as text ([3240bfc](https://github.com/gnucoop/ajf/commit/3240bfc0697f8d96b261f1dfadc6e74cc17e04d1))
* **material/reports:** add Layout widget to defaultWidgetsFactory ([c8484d1](https://github.com/gnucoop/ajf/commit/c8484d1b6cd7643d210460fb8d1d86c7664c20cf))
* **multiple:** add missing aria labels in form fields ([4a45825](https://github.com/gnucoop/ajf/commit/4a4582589febbb43b1c3edcbbc603da4b187a85d))
* **multiple:** approve api change in core/common and material/monaco-editor ([026413f](https://github.com/gnucoop/ajf/commit/026413fb337a5f118327bc86cb718c1a11718d5c))
* **multiple:** remove some circular deps in reports modules ([9864187](https://github.com/gnucoop/ajf/commit/986418751f2c0088950c92b96ec3fe09f08aebe9))
* **multiple:** report from xls ([8489fda](https://github.com/gnucoop/ajf/commit/8489fdad9072e55a81e950230551ce2f29e79225))
* **multiple:** reports default widgets map need to be provided in root ([a0fc21b](https://github.com/gnucoop/ajf/commit/a0fc21bd576848ff46e26ef40cec1e4adca3329a))
* **report-to-pdf:** fix retrieval of chart's canvasDataUrl in material component ([4f2dee2](https://github.com/gnucoop/ajf/commit/4f2dee2e93a302c22c249d38484c78daa2d103e7))
### Features
* add support for TypeScript 4.0 ([173aec1](https://github.com/gnucoop/ajf/commit/173aec1fcc197c5bdfd28a0aba00d79b583eb8ba))
* **calendars/ethiopian:** add calendar pipe ([31add4a](https://github.com/gnucoop/ajf/commit/31add4a6c5b768c93e04e2c94268ac0a58f6a8e6))
* **calendars:** add ethiopian calendar module ([55064f6](https://github.com/gnucoop/ajf/commit/55064f6308104c4a1789bf9fc89c96be05018d56))
* change tslib from direct dependency to peerDependency ([0fea4be](https://github.com/gnucoop/ajf/commit/0fea4be28ab4329ae5413a5de11f8f9db1af995e))
* **core/calendar:** add gregorian calendar module ([0c94854](https://github.com/gnucoop/ajf/commit/0c948547d1c650d21dbbc1dfcce438b9f4fa510b))
* **core/chart:** add support for chart.js callback functions ([4a37122](https://github.com/gnucoop/ajf/commit/4a371227efb89d462e79fa32a2f357e1734af58d))
* **core/common:** add helper to build a string from a string identifier ([b2f03b1](https://github.com/gnucoop/ajf/commit/b2f03b11038fd9f8cd4904334925eb9bc57fc793))
* **core/file-input:** add accept input to limit file mime type ([6840281](https://github.com/gnucoop/ajf/commit/6840281727b30f6d72260d478ea60b3e573f01a3))
* **core/file-input:** add file input component ([62d7551](https://github.com/gnucoop/ajf/commit/62d7551fc7592be0a243eea4be4e034c2cc5aa49))
* **core/file-input:** add upload to storage options in file field ([e48bd88](https://github.com/gnucoop/ajf/commit/e48bd88493d94df63f594e8bf30870a86d6d9947))
* **core/form:** make a slide readonly by condition ([6d6f0e4](https://github.com/gnucoop/ajf/commit/6d6f0e44e89453faa6c419a70d77a237490cad8b))
* **core/forms:**  make a field read-only from the schema ([41b06ef](https://github.com/gnucoop/ajf/commit/41b06ef6932eecd0ebe71c57785d9f4d26347933))
* **core/forms:** add file field ([fc2b066](https://github.com/gnucoop/ajf/commit/fc2b0664d03bab43380de8f5549f80de19fd0e4e))
* **core/forms:** add image field ([14dfa1c](https://github.com/gnucoop/ajf/commit/14dfa1c11800a30ca8d80f1af7709430ea0ab2e9))
* **core/forms:** add new file field type ([99eb889](https://github.com/gnucoop/ajf/commit/99eb88937154fdab5483c9d8a3b57b08d98b76ee))
* **core/forms:** add pipe to build string from string identifier ([3fa1ceb](https://github.com/gnucoop/ajf/commit/3fa1ceb5717cb39b1db3cfeb19ab4155e6c3d4be))
* **core/forms:** add range field ([6f5d0f0](https://github.com/gnucoop/ajf/commit/6f5d0f0e6c07c91f3de4c175e961f60041aaa0be))
* **core/forms:** add video url field type ([5d84a7d](https://github.com/gnucoop/ajf/commit/5d84a7dcadd30a6399e9204c127997fcaf7997b9))
* **core/forms:** form-to-pdf ([20b4cd7](https://github.com/gnucoop/ajf/commit/20b4cd706af0b4513bda25f4341eda17051b6f8e))
* **core/forms:** improve form-to-pdf api ([4e430ec](https://github.com/gnucoop/ajf/commit/4e430ec0b5828f3b32623e7c121691741a6859a3))
* **core/graph:** add e2e test ([d7d4833](https://github.com/gnucoop/ajf/commit/d7d4833b4aee0aa025b28e5f6b44fea57707c4f0))
* **core/graph:** add new graph widget ([fb5817e](https://github.com/gnucoop/ajf/commit/fb5817e08583a7969dafd2e0978c0a60a46b0d87))
* **core/heat-map:** add heat map component ([686d978](https://github.com/gnucoop/ajf/commit/686d9787a8f8e11d838ae8a66e5c1806e8f6dfc6))
* **core/reports:** Add action in heatmap. Add dynamic formdata list in xlsreports. ([9c6869b](https://github.com/gnucoop/ajf/commit/9c6869bd901735ed9fb5bbf23a519be3e2d85939))
* **core/reports:** add AjfWidgetService for custom widgets definition ([b7335ae](https://github.com/gnucoop/ajf/commit/b7335ae9adffd23b36f1d220b830faac0040ed1b))
* **core/reports:** add dynamic table widget ([9c4e76e](https://github.com/gnucoop/ajf/commit/9c4e76e6982b91d6ffb30af7f89718796fd1b0fd))
* **core/reports:** add filter widget ([eea3db2](https://github.com/gnucoop/ajf/commit/eea3db213e7cb81374c87f64a0c403bdee688e30))
* **core/reports:** add formula for paginated widget and function for formdata in dynamic table ([a2f60af](https://github.com/gnucoop/ajf/commit/a2f60af4a6ce3211111cc0eefc2c0d9e950a1cdd))
* **core/reports:** add graph in xls report ([2590bd0](https://github.com/gnucoop/ajf/commit/2590bd0d507391c7df94a419127c2f655560ab77))
* **core/reports:** add pipe to build string from string identifier ([2c585f5](https://github.com/gnucoop/ajf/commit/2c585f5a71340f4b50ec1aa24264f0452973ddfa))
* **core/reports:** add range field in report from form ([996b165](https://github.com/gnucoop/ajf/commit/996b165d0a84665744e3c015363805d3a5e286f9))
* **core/reports:** add report builder by xls ([9ef65dd](https://github.com/gnucoop/ajf/commit/9ef65dd20de6b6c7a12575d7dbdf8a60edee3a45))
* **core/reports:** add report functions for dynamic form table and paginated lists ([ddb66fa](https://github.com/gnucoop/ajf/commit/ddb66faf7604cfdf6a352e8d8c6cbd125574cb92))
* **core/reports:** add string identifier in report interface ([6e3abab](https://github.com/gnucoop/ajf/commit/6e3abab375de3aaaa86c082bb5acefaf233e98e0))
* **core/reports:** add support for heatmap widgets in xlsreports ([2955009](https://github.com/gnucoop/ajf/commit/2955009eb4d554a2a01c6bd3ecbb52b775bee21a))
* **core/reports:** add support for user defined init functions in custom widgets ([6d0c788](https://github.com/gnucoop/ajf/commit/6d0c7888bb217bd1d5d27f44116f844dac1fdd0d))
* **core/reports:** add xls function for paginated table with dialog ([49fca66](https://github.com/gnucoop/ajf/commit/49fca662dab0206d752e6a757e7f0d5b7eefcaaf))
* **core/reports:** expression-utils functions implemented in hindikit-parser ([d31953a](https://github.com/gnucoop/ajf/commit/d31953af7097e86fd3a996a1ccc1811322fe02d1))
* **core/reports:** heatmap widget values from formula ([5efbb82](https://github.com/gnucoop/ajf/commit/5efbb82dbf0471131293e9a23f06ae559b7a31fd))
* **core/reports:** html icons to text in csv/xlsx widget export ([0dc2248](https://github.com/gnucoop/ajf/commit/0dc2248a2cebfd141ba23a37652d3f845c807ffd))
* **core/reports:** icons to text translation in pdf printing ([35c50dd](https://github.com/gnucoop/ajf/commit/35c50dd4af581ca551b21c476d4e138b15f54c35))
* **core/reports:** js in xlsreport formulas ([08118fd](https://github.com/gnucoop/ajf/commit/08118fd9228cf220ae78c21e52b07ea6c264e39c))
* **core/reports:** pdf printing of dynamic tables ([878c4f2](https://github.com/gnucoop/ajf/commit/878c4f275809d4756568528743a134840934aabb))
* **core/reports:** set image width from styles ([7359a03](https://github.com/gnucoop/ajf/commit/7359a03c7851fcf40734a911b0b0c83e226c008c))
* **core/reports:** xlsreport: improved error reporting ([7025985](https://github.com/gnucoop/ajf/commit/7025985a565dc5c6f522c6d5059f4059a61263c4))
* **core/testing:** add private helpers for e2e tests ([aeaac2e](https://github.com/gnucoop/ajf/commit/aeaac2e11e96a71259e2725ede944544540ecc95))
* **core/transloco:** support override of default transloco configuration ([aa82786](https://github.com/gnucoop/ajf/commit/aa827863d1d05c46d34b4cde7eb4cc7a002beb5a))
* **form:** add hint ([e02071e](https://github.com/gnucoop/ajf/commit/e02071eb8d3a39150d8fdf907c3d0616fe9707fc))
* **github:** make robzan8 owner of form-to-pdf and report-to-pdf ([71a146b](https://github.com/gnucoop/ajf/commit/71a146b254e18ecca76aec7d26fbfe5217acacfd))
* **ionic/forms:** add video url field component ([7bbb1cb](https://github.com/gnucoop/ajf/commit/7bbb1cb432e732f15e2c512f1b2da69f3cdcab50))
* **ionic/reports:** add support for custom report widgets definition ([2fd8343](https://github.com/gnucoop/ajf/commit/2fd834317bd756ff4bb0cd2bd0ccec720035e7da))
* **material/form-builder:** add show attribute to string identifier  ([a07f752](https://github.com/gnucoop/ajf/commit/a07f752306f8ebe925db45026b1a8bec2850e7c7))
* **material/form-builder:** add support for range field properties ([e55d51f](https://github.com/gnucoop/ajf/commit/e55d51fc1f9c1445cc192335115b428b7f8c2f08))
* **material/form-builder:** add support for table fields ([662d6a1](https://github.com/gnucoop/ajf/commit/662d6a1f5623c99599f18a93a281cecdeac6fd3f))
* **material/form-builder:** Added Drag & Drop functionalities. ([e611a24](https://github.com/gnucoop/ajf/commit/e611a24b26bba1b94ee4837ad7f35c636463c083))
* **material/form-builder:** always show input in choices origin editor ([9b50c84](https://github.com/gnucoop/ajf/commit/9b50c84d9f2d74a536dacff2583b754413e28479))
* **material/forms:** add slides validation indicator in breadcrumbs ([cbe9f36](https://github.com/gnucoop/ajf/commit/cbe9f360667c7d1614026b9ae3692bf675a20a71))
* **material/forms:** add video url field component ([94b0b58](https://github.com/gnucoop/ajf/commit/94b0b58ffd6867a58cc12b728b94756be5e5b5aa))
* **material/forms:** render text fields in a text area ([ea2f70a](https://github.com/gnucoop/ajf/commit/ea2f70a308b8d4a4a8b09824add65df62bff5061))
* **material/report-builder:** add hint to field node properties ([b334583](https://github.com/gnucoop/ajf/commit/b33458344f8b69bbe9ab86d9f8e32996394cb0c3))
* **material/reports:** add support for custom report widgets definition ([13ae02f](https://github.com/gnucoop/ajf/commit/13ae02f23f5d9dfb063fc2ad0995a797ee816a9c))
* **multiple:** add report from form function ([ba72d14](https://github.com/gnucoop/ajf/commit/ba72d14aeb8c9346dad3a93ee7e3f8cb46f34a3a))
* **multiple:** add support for TypeScript 4.4 ([417b470](https://github.com/gnucoop/ajf/commit/417b470e276e1a8e826425d0be64ac5b6dfbb689))
* **multiple:** bold form labels in readonly mode ([bed736f](https://github.com/gnucoop/ajf/commit/bed736fc6aef1924f2d71d0e0089fbf92dce99d4))
* **multiple:** switch front/back camera in barcode video ([99064ec](https://github.com/gnucoop/ajf/commit/99064ecd6338c8f07fda8d605cffdb2c6bb861d6))
* **page-slider:** add disableRemoval mode in repeating slide ([91bfeaa](https://github.com/gnucoop/ajf/commit/91bfeaa85d6bc78174219683be55d38bfbc7b36f))
* report warning if duplicate theme styles are generated ([bfc59fd](https://github.com/gnucoop/ajf/commit/bfc59fd0c01762bbbd8b18844d8fb4976d996343))
* report-to-pdf ([2d15b6a](https://github.com/gnucoop/ajf/commit/2d15b6a4df5e5e837aa42363ce3cc0772b1f870b))
* **reports:** add dialog widget ([ad9358f](https://github.com/gnucoop/ajf/commit/ad9358fe1b56053a436797a51b1ee727b9134745))
* **reports:** add heat map widget ([a2a5674](https://github.com/gnucoop/ajf/commit/a2a567465e2ee10e2e18698fc4ba6a1396e63a26))
* **reports:** add paginated list widget ([e123bd1](https://github.com/gnucoop/ajf/commit/e123bd16c2ff4bc505ade520a871eaf2d83cb9ab))
### Reverts
* Revert "ci: disable remote http bazel cache" ([16df869](https://github.com/gnucoop/ajf/commit/16df869a91ee56f67d796a4b2bc45a2c39493e4f))
* Revert "chore: add script to resync caretaker app open PRs" ([16f7dec](https://github.com/gnucoop/ajf/commit/16f7dec0afd83bee82e918b833e0c9b3907af732))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.2.4"></a>
# 13.2.4 "yearning-earwig" (2022-08-04)

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.2.3"></a>
# 13.2.3 "evident-magpie" (2022-07-29)
### Features
* **core/reports:** add xls function for paginated table with dialog ([49fca66](https://github.com/gnucoop/ajf/commit/49fca662dab0206d752e6a757e7f0d5b7eefcaaf))
* **core/reports:** js in xlsreport formulas ([08118fd](https://github.com/gnucoop/ajf/commit/08118fd9228cf220ae78c21e52b07ea6c264e39c))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.2.2"></a>
# 13.2.2 "wandering-harrier" (2022-07-21)
### Features
* **core/reports:** Add action in heatmap. Add dynamic formdata list in xlsreports. ([9c6869b](https://github.com/gnucoop/ajf/commit/9c6869bd901735ed9fb5bbf23a519be3e2d85939))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.2.1"></a>
# 13.2.1 "parallel-wolverine" (2022-07-14)
### Bug Fixes
* **core/reports:** convert rows for table into plain array. Add new function for compare date. ([e3e1bf0](https://github.com/gnucoop/ajf/commit/e3e1bf02e48b2a4cd4b73648d196cd4f0ca073b9))
### Features
* **core/reports:** add formula for paginated widget and function for formdata in dynamic table ([a2f60af](https://github.com/gnucoop/ajf/commit/a2f60af4a6ce3211111cc0eefc2c0d9e950a1cdd))
* **core/reports:** add report functions for dynamic form table and paginated lists ([ddb66fa](https://github.com/gnucoop/ajf/commit/ddb66faf7604cfdf6a352e8d8c6cbd125574cb92))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.2.0"></a>
# 13.2.0 "jittery-dormouse" (2022-07-04)
### Bug Fixes
* **core/echarts:** make echarts module options required ([787f0e0](https://github.com/gnucoop/ajf/commit/787f0e082ad50ab457d8d1e8415e87d558fdc138))
* **core/reports:** missing props in heat map widget instance ([7ccd7d6](https://github.com/gnucoop/ajf/commit/7ccd7d6685ee9016b68bb488b8cb6454c1e749b7))
### Features
* **core/file-input:** add upload to storage options in file field ([e48bd88](https://github.com/gnucoop/ajf/commit/e48bd88493d94df63f594e8bf30870a86d6d9947))
* **core/heat-map:** add heat map component ([686d978](https://github.com/gnucoop/ajf/commit/686d9787a8f8e11d838ae8a66e5c1806e8f6dfc6))
* **core/reports:** add support for heatmap widgets in xlsreports ([2955009](https://github.com/gnucoop/ajf/commit/2955009eb4d554a2a01c6bd3ecbb52b775bee21a))
* **core/reports:** heatmap widget values from formula ([5efbb82](https://github.com/gnucoop/ajf/commit/5efbb82dbf0471131293e9a23f06ae559b7a31fd))
* **core/reports:** xlsreport: improved error reporting ([7025985](https://github.com/gnucoop/ajf/commit/7025985a565dc5c6f522c6d5059f4059a61263c4))
* **reports:** add dialog widget ([ad9358f](https://github.com/gnucoop/ajf/commit/ad9358fe1b56053a436797a51b1ee727b9134745))
* **reports:** add heat map widget ([a2a5674](https://github.com/gnucoop/ajf/commit/a2a567465e2ee10e2e18698fc4ba6a1396e63a26))
* **reports:** add paginated list widget ([e123bd1](https://github.com/gnucoop/ajf/commit/e123bd16c2ff4bc505ade520a871eaf2d83cb9ab))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.1.5"></a>
# 13.1.5 "wonderful-crocodile" (2022-05-06)
### Bug Fixes
* **core/reports:** widget.options misspell in widgetToWidgetInstance ([6c96a41](https://github.com/gnucoop/ajf/commit/6c96a41888ecd70c5588ea481593edc988d35dcd))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.1.4"></a>
# 13.1.4 "brief-ape" (2022-04-29)
### Bug Fixes
* **core/file-input:** update angular form value on input reset ([84e535e](https://github.com/gnucoop/ajf/commit/84e535e87dbd1bf7c635685dd07dbf7d955d7939))
* **core/graph:** fix svg-pan-zoom import ([921bd39](https://github.com/gnucoop/ajf/commit/921bd39bdf9cc631b7cce3bbd7787f430a04389c))
* **core/graph:** remove unused file ([319483b](https://github.com/gnucoop/ajf/commit/319483b639774ae5a37557ff7ad9f65f6fc923c6))
### Features
* **core/graph:** add e2e test ([d7d4833](https://github.com/gnucoop/ajf/commit/d7d4833b4aee0aa025b28e5f6b44fea57707c4f0))
* **core/graph:** add new graph widget ([fb5817e](https://github.com/gnucoop/ajf/commit/fb5817e08583a7969dafd2e0978c0a60a46b0d87))
* **core/reports:** add graph in xls report ([2590bd0](https://github.com/gnucoop/ajf/commit/2590bd0d507391c7df94a419127c2f655560ab77))
* **multiple:** switch front/back camera in barcode video ([99064ec](https://github.com/gnucoop/ajf/commit/99064ecd6338c8f07fda8d605cffdb2c6bb861d6))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.1.3"></a>
# 13.1.3 "satisfied-tarsier" (2022-04-05)

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.1.2"></a>
# 13.1.2 "determined-toucan" (2022-03-31)
### Bug Fixes
* **core/models:** ALL_VALUES_OF is not extracting values from main forms ([3da14e6](https://github.com/gnucoop/ajf/commit/3da14e6c5f9af75f1418b06dd5756764ceb5be60))
* **core/models:** sort code identifiers ([6eb6093](https://github.com/gnucoop/ajf/commit/6eb6093912bd12300aa6aff87b54471a64a1ac2e))
* **core/reports:** hindikit: generalized function parsing ([2a60233](https://github.com/gnucoop/ajf/commit/2a602331718aebb6ed58c2168947e46af37d1401))
### Features
* **material/form-builder:** add support for table fields ([662d6a1](https://github.com/gnucoop/ajf/commit/662d6a1f5623c99599f18a93a281cecdeac6fd3f))
* **multiple:** bold form labels in readonly mode ([bed736f](https://github.com/gnucoop/ajf/commit/bed736fc6aef1924f2d71d0e0089fbf92dce99d4))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.1.1"></a>
# 13.1.1 "deliberate-gibbon" (2022-03-22)
### Features
* **core/transloco:** support override of default transloco configuration ([aa82786](https://github.com/gnucoop/ajf/commit/aa827863d1d05c46d34b4cde7eb4cc7a002beb5a))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.1.0"></a>
# 13.1.0 "unwilling-tapir" (2022-03-21)
### Bug Fixes
* **calendars/ethiopian:** fix month number in ethiopian pipe ([7805c31](https://github.com/gnucoop/ajf/commit/7805c31657fa898b057fa8afca1a2dae28f57936))
* **core/chart:** Fixed chart pieceLabel assignment ([1a95372](https://github.com/gnucoop/ajf/commit/1a953725693bc045cae488172134cd1c1c9150e3))
* **core/forms:** form-to-pdf: fix printing of formula fields ([65fd4a7](https://github.com/gnucoop/ajf/commit/65fd4a71ea5c29d20142f9202c4a8ec18ef109f9))
* **core/forms:** trigger form state updates on group removal ([ae0c55d](https://github.com/gnucoop/ajf/commit/ae0c55d487bf3880bff691e2ba0839e320a86698))
* **core/report:** fix expression-utils functions ([32b4f31](https://github.com/gnucoop/ajf/commit/32b4f31b5b5e97dc17ca6777d33593441463b907))
* **core/reports:** export also dynamic table widget both with rowspan or colspan ([60a2b4c](https://github.com/gnucoop/ajf/commit/60a2b4cd9517e75f37e1d703747ded0f854da7ef))
* **core:** fix COUNT_FORMS_UNIQUE ([cab93d5](https://github.com/gnucoop/ajf/commit/cab93d5dfec9fe9d71f33d0be6f5e2175b373227))
* **multiple:** report from xls ([8489fda](https://github.com/gnucoop/ajf/commit/8489fdad9072e55a81e950230551ce2f29e79225))
### Features
* **core/reports:** add filter widget ([eea3db2](https://github.com/gnucoop/ajf/commit/eea3db213e7cb81374c87f64a0c403bdee688e30))
* **core/reports:** add report builder by xls ([9ef65dd](https://github.com/gnucoop/ajf/commit/9ef65dd20de6b6c7a12575d7dbdf8a60edee3a45))
* **core/reports:** expression-utils functions implemented in hindikit-parser ([d31953a](https://github.com/gnucoop/ajf/commit/d31953af7097e86fd3a996a1ccc1811322fe02d1))
* **core/reports:** html icons to text in csv/xlsx widget export ([0dc2248](https://github.com/gnucoop/ajf/commit/0dc2248a2cebfd141ba23a37652d3f845c807ffd))
* **material/form-builder:** add support for range field properties ([e55d51f](https://github.com/gnucoop/ajf/commit/e55d51fc1f9c1445cc192335115b428b7f8c2f08))
* **material/forms:** add slides validation indicator in breadcrumbs ([cbe9f36](https://github.com/gnucoop/ajf/commit/cbe9f360667c7d1614026b9ae3692bf675a20a71))
### Reverts
* Revert "ci: disable remote http bazel cache" ([16df869](https://github.com/gnucoop/ajf/commit/16df869a91ee56f67d796a4b2bc45a2c39493e4f))

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.0.0"></a>
# 13.0.0 "successive-tahr" (2022-03-10)
### core
| Commit | Type | Description |
| -- | -- | -- |
| [083440a92](https://github.com/gnucoop/ajf/commit/083440a9224f4e1a9ff34d8c1796d1ced127b5d8) | feat | **reports:** add filter widget |
| [b93407817](https://github.com/gnucoop/ajf/commit/b93407817c2544d250f2597351094f9b0a1f0065) | fix | **forms:** classes using Angular features need to be decorated |
| [3c7524545](https://github.com/gnucoop/ajf/commit/3c75245450d276679a52012e424373e3e3443afb) | fix | **forms:** unable to create node instance if no validation condition has been defined |
| [2f19941ff](https://github.com/gnucoop/ajf/commit/2f19941ff8a3eececec9a0d3392c0ad7ed05a1a1) | fix | **report:** fix expression-utils functions |
| [1aa7c3536](https://github.com/gnucoop/ajf/commit/1aa7c3536df61717187bc2be185a845719845f4d) | fix | fix COUNT_FORMS_UNIQUE |
### material
| Commit | Type | Description |
| -- | -- | -- |
| [2747ff2ce](https://github.com/gnucoop/ajf/commit/2747ff2ce9f65d47b1e2a84d7633ad3e0f8fd564) | feat | **form-builder:** add support for range field properties |
### multiple
| Commit | Type | Description |
| -- | -- | -- |
| [417b470e2](https://github.com/gnucoop/ajf/commit/417b470e276e1a8e826425d0be64ac5b6dfbb689) | feat | add support for TypeScript 4.4 |
## Special Thanks
Marco Marche, peppedeka and trik

<!-- CHANGELOG SPLIT MARKER -->

<a name="12.1.7"></a>
# 12.1.7 "dark-parrot" (2022-01-10)
### calendars
| Commit | Type | Description |
| -- | -- | -- |
| [2d8bc05ce](https://github.com/gnucoop/ajf/commit/2d8bc05ced1cf63733a1a193e27228b94624874f) | fix | **ethiopian:** fix month number in ethiopian pipe |
### core
| Commit | Type | Description |
| -- | -- | -- |
| [05f6bf3d0](https://github.com/gnucoop/ajf/commit/05f6bf3d063a45ae529d6465be03f8f731b14601) | feat | **reports:** add report builder by xls |
| [2c2b027e1](https://github.com/gnucoop/ajf/commit/2c2b027e1f8c96e0d62150bd2da3a24007e45976) | feat | **reports:** expression-utils functions implemented in hindikit-parser |
| [b211ce879](https://github.com/gnucoop/ajf/commit/b211ce8799474ef40ba7233a48ac2aeeb74fc32e) | feat | **reports:** html icons to text in csv/xlsx widget export |
| [d2b00a530](https://github.com/gnucoop/ajf/commit/d2b00a53056409bf01fad1a04efcdb75a4e88cfa) | fix | **chart:** Fixed chart pieceLabel assignment |
| [0d19c887f](https://github.com/gnucoop/ajf/commit/0d19c887f4b51718f910d6be76ba5e7b622fa1b9) | fix | **reports:** export also dynamic table widget both with rowspan or colspan |
### multiple
| Commit | Type | Description |
| -- | -- | -- |
| [fc3b0e02f](https://github.com/gnucoop/ajf/commit/fc3b0e02f5774fe5986555ed5e8029319d9dc6c5) | fix | report from xls |
## Special Thanks
Marco Tozzi, Roberto Zanotto, peppedeka, sara and trik

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.0.0-rc.1"></a>
# 13.0.0-rc.1 "evolutionary-lamprey" (2022-01-10)
### calendars
| Commit | Type | Description |
| -- | -- | -- |
| [efc186e9b](https://github.com/gnucoop/ajf/commit/efc186e9b32fe4c2a8c689588e30cf98dca979fd) | fix | **ethiopian:** fix month number in ethiopian pipe |
### core
| Commit | Type | Description |
| -- | -- | -- |
| [3c62783e1](https://github.com/gnucoop/ajf/commit/3c62783e131fc487ddea3ca83d25f1c86f742253) | feat | **reports:** add report builder by xls |
| [5b2c3ffad](https://github.com/gnucoop/ajf/commit/5b2c3ffad176ad5eb4ff2df8f35f3e2ec3ac1423) | feat | **reports:** expression-utils functions implemented in hindikit-parser |
| [5a662c6ba](https://github.com/gnucoop/ajf/commit/5a662c6ba761958c61f032b7461b67d1c3d9b941) | feat | **reports:** html icons to text in csv/xlsx widget export |
### multiple
| Commit | Type | Description |
| -- | -- | -- |
| [fdffd9425](https://github.com/gnucoop/ajf/commit/fdffd942547d45f789d5499b2a76b79ea61b63c3) | fix | report from xls |
## Special Thanks
Roberto Zanotto, peppedeka, sara and trik

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.0.0-rc.0"></a>
# 13.0.0-rc.0 "technical-starfish" (2021-10-29)
### core
| Commit | Type | Description |
| -- | -- | -- |
| [1a9537256](https://github.com/gnucoop/ajf/commit/1a953725693bc045cae488172134cd1c1c9150e3) | fix | **chart:** Fixed chart pieceLabel assignment |
| [60a2b4cd9](https://github.com/gnucoop/ajf/commit/60a2b4cd9517e75f37e1d703747ded0f854da7ef) | fix | **reports:** export also dynamic table widget both with rowspan or colspan |
## Special Thanks
Marco Marche, Marco Tozzi, sara and trik

<!-- CHANGELOG SPLIT MARKER -->

<a name="12.1.6"></a>
# 12.1.6 "key-toad" (2021-10-20)
## Special Thanks
trik


<a name="13.0.0-next.10"></a>
# 13.0.0-next.10 "acceptable-bonobo" (2021-10-20)
## Special Thanks
trik

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.0.0-next.9"></a>
# 13.0.0-next.9 "empty-river" (2021-10-13)
### core
| Commit | Type | Description |
| -- | -- | -- |
| [b93407817](https://github.com/gnucoop/ajf/commit/b93407817c2544d250f2597351094f9b0a1f0065) | fix | **forms:** classes using Angular features need to be decorated |
## Special Thanks
trik

<!-- CHANGELOG SPLIT MARKER -->

<a name="12.1.5"></a>
# 12.1.5 "throbbing-snow" (2021-10-13)
### core
| Commit | Type | Description |
| -- | -- | -- |
| [db28cc122](https://github.com/gnucoop/ajf/commit/db28cc122eaeeae5a9d4b3b8dc4baf46b406cd4d) | fix | **reports:** AjfReport instance imported using current module name |
| [558af3ae8](https://github.com/gnucoop/ajf/commit/558af3ae849e44a1a34dc99d3f1f2f90d670ee5f) | fix | **reports:** increase page size and fix printing of numbers in tables |
### dev-app
| Commit | Type | Description |
| -- | -- | -- |
| [e78680438](https://github.com/gnucoop/ajf/commit/e7868043896872b0d42a1a0aae9eddaead2cd011) | fix | report from form params |
| [ba0e05af5](https://github.com/gnucoop/ajf/commit/ba0e05af534fc0d187a00528971e1fe2e2c6ed92) | fix | report from form set schema wrong params |
### multiple
| Commit | Type | Description |
| -- | -- | -- |
| [619c95d48](https://github.com/gnucoop/ajf/commit/619c95d485fc7e463ea30234524290a8b1872c92) | fix | add missing aria labels in form fields |
## Special Thanks
Roberto Zanotto, peppedeka and trik


<a name="13.0.0-next.8"></a>
# 13.0.0-next.8 "misty-shape" (2021-10-12)
### core
| Commit | Type | Description |
| -- | -- | -- |
| [3c7524545](https://github.com/gnucoop/ajf/commit/3c75245450d276679a52012e424373e3e3443afb) | fix | **forms:** unable to create node instance if no validation condition has been defined |
| [761c8f6ef](https://github.com/gnucoop/ajf/commit/761c8f6ef97d15ea3da843157462e8c74b72bc5f) | fix | **reports:** AjfReport instance imported using current module name |
| [8f68a1496](https://github.com/gnucoop/ajf/commit/8f68a14964e86b21c09fa7fb159c213d95e0702c) | fix | **reports:** increase page size and fix printing of numbers in tables |
### dev-app
| Commit | Type | Description |
| -- | -- | -- |
| [9259640b5](https://github.com/gnucoop/ajf/commit/9259640b57a7681fa2c04b04c38610b451127388) | fix | report from form params |
| [90e453955](https://github.com/gnucoop/ajf/commit/90e453955e3927930397470aac5921735ba91721) | fix | report from form set schema wrong params |
### multiple
| Commit | Type | Description |
| -- | -- | -- |
| [417b470e2](https://github.com/gnucoop/ajf/commit/417b470e276e1a8e826425d0be64ac5b6dfbb689) | feat | add support for TypeScript 4.4 |
| [4a4582589](https://github.com/gnucoop/ajf/commit/4a4582589febbb43b1c3edcbbc603da4b187a85d) | fix | add missing aria labels in form fields |
## Special Thanks
Marco Marche, Roberto Zanotto, peppedeka and trik

<!-- CHANGELOG SPLIT MARKER -->

<a name="12.1.4"></a>
# 12.1.4 "plain-silence" (2021-09-30)
### core
| Commit | Type | Description |
| -- | -- | -- |
| [1e959ba0b](https://github.com/gnucoop/ajf/commit/1e959ba0bba6c7974e761d79a270a9117dc2b5c0) | feat | **reports:** add range field in report from form |
| [266210286](https://github.com/gnucoop/ajf/commit/2662102864fb398364efd990f00aac2f125821e7) | fix | **forms:** in table force value to number if type is number |
| [e99e841af](https://github.com/gnucoop/ajf/commit/e99e841af7ffb45b7f609409f34c62af6a5dd1e0) | fix | **forms:** Node serializer fromJson name assignment. |
## Special Thanks
Marco Tozzi, peppedeka, sara and trik


<a name="13.0.0-next.2"></a>
# 13.0.0-next.2 "still-mouse" (2021-09-30)
### core
| Commit | Type | Description |
| -- | -- | -- |
| [996b165d0](https://github.com/gnucoop/ajf/commit/996b165d0a84665744e3c015363805d3a5e286f9) | feat | **reports:** add range field in report from form |
| [f2e2c3996](https://github.com/gnucoop/ajf/commit/f2e2c399622f31f6e868ef8ec90406348d5effb9) | fix | **forms:** in table force value to number if type is number |
| [0c562cd85](https://github.com/gnucoop/ajf/commit/0c562cd85013f3e2cc9f1f6033336de89695ad3f) | fix | **forms:** Node serializer fromJson name assignment. |
## Special Thanks
Marco Marche, Marco Tozzi, peppedeka, sara and trik

<!-- CHANGELOG SPLIT MARKER -->

<a name="12.1.3"></a>
# 12.1.3 "flat-cloud" (2021-09-27)
### core
| Commit | Type | Description |
| -- | -- | -- |
| [80314898e](https://github.com/gnucoop/ajf/commit/80314898ea22d294e46ae59aef076865e5d3e1ca) | fix | **forms:** unable to create form instance if no validation condition has been defined |
## Special Thanks
trik


<a name="13.0.0-next.1"></a>
# 13.0.0-next.1 "ancient-sea" (2021-09-27)
### core
| Commit | Type | Description |
| -- | -- | -- |
| [3c7524545](https://github.com/gnucoop/ajf/commit/3c75245450d276679a52012e424373e3e3443afb) | fix | **forms:** unable to create node instance if no validation condition has been defined |

<!-- CHANGELOG SPLIT MARKER -->

<a name="13.0.0-next.0"></a>
# 0.0.0 "hidden-silence" (2021-09-20)
### core
| Commit | Type | Description |
| -- | -- | -- |
| [6d6f0e44e](https://github.com/gnucoop/ajf/commit/6d6f0e44e89453faa6c419a70d77a237490cad8b) | feat | **form:** make a slide readonly by condition |
| [6f5d0f0e6](https://github.com/gnucoop/ajf/commit/6f5d0f0e6c07c91f3de4c175e961f60041aaa0be) | feat | **forms:** add range field |
| [35c50dd4a](https://github.com/gnucoop/ajf/commit/35c50dd4af581ca551b21c476d4e138b15f54c35) | feat | **reports:** icons to text translation in pdf printing |
| [11e0eed46](https://github.com/gnucoop/ajf/commit/11e0eed46aa9ef80d712aed88801390c7eaa5d05) | fix | **range:** range field must call base class ngOnInit method |
### multiple
| Commit | Type | Description |
| -- | -- | -- |
| [ba72d14ae](https://github.com/gnucoop/ajf/commit/ba72d14aeb8c9346dad3a93ee7e3f8cb46f34a3a) | feat | add report from form function |

<a name="12.1.2"></a>
# 12.1.2 "soft-snow" (2021-09-21)
## Special Thanks
Marco Marche and trik


<a name="12.1.0"></a>
# 12.1.0 "winter-credit" (2021-09-20)
### core
| Commit | Type | Description |
| -- | -- | -- |
| [6f5d0f0e6](https://github.com/gnucoop/ajf/commit/6f5d0f0e6c07c91f3de4c175e961f60041aaa0be) | feat | **forms:** add range field |
| [6d6f0e44e](https://github.com/gnucoop/ajf/commit/6d6f0e44e89453faa6c419a70d77a237490cad8b) | feat | **form:** make a slide readonly by condition |
| [35c50dd4a](https://github.com/gnucoop/ajf/commit/35c50dd4af581ca551b21c476d4e138b15f54c35) | feat | **reports:** icons to text translation in pdf printing |
| [11e0eed46](https://github.com/gnucoop/ajf/commit/11e0eed46aa9ef80d712aed88801390c7eaa5d05) | fix | **range:** range field must call base class ngOnInit method |
### multiple
| Commit | Type | Description |
| -- | -- | -- |
| [ba72d14ae](https://github.com/gnucoop/ajf/commit/ba72d14aeb8c9346dad3a93ee7e3f8cb46f34a3a) | feat | add report from form function |


<a name="13.0.0-next.0"></a>
# 13.0.0-next.0 "hidden-silence" (2021-09-20)
### core
| Commit | Type | Description |
| -- | -- | -- |
| [6d6f0e44e](https://github.com/gnucoop/ajf/commit/6d6f0e44e89453faa6c419a70d77a237490cad8b) | feat | **form:** make a slide readonly by condition |
| [6f5d0f0e6](https://github.com/gnucoop/ajf/commit/6f5d0f0e6c07c91f3de4c175e961f60041aaa0be) | feat | **forms:** add range field |
| [35c50dd4a](https://github.com/gnucoop/ajf/commit/35c50dd4af581ca551b21c476d4e138b15f54c35) | feat | **reports:** icons to text translation in pdf printing |
| [11e0eed46](https://github.com/gnucoop/ajf/commit/11e0eed46aa9ef80d712aed88801390c7eaa5d05) | fix | **range:** range field must call base class ngOnInit method |
### multiple
| Commit | Type | Description |
| -- | -- | -- |
| [ba72d14ae](https://github.com/gnucoop/ajf/commit/ba72d14aeb8c9346dad3a93ee7e3f8cb46f34a3a) | feat | add report from form function |

<a name="12.1.0-next.2"></a>
# 12.1.0-next.2 "parsimonious-cover" (2021-08-30)

### core

|            |                       |
| ---------- | --------------------- |
| bug fix |  **forms:** add default choiceorigins to schema when export form to pdf ([8632c9be7e96c1abb0dcbd7fd5cfe643c830077a](https://github.com/gnucoop/ajf/commit/8632c9be7e96c1abb0dcbd7fd5cfe643c830077a)) |
| bug fix |  **forms:** update field instance state in init node.  ([44ebb8acf91eed8355ba1ad40604fcc659f9d982](https://github.com/gnucoop/ajf/commit/44ebb8acf91eed8355ba1ad40604fcc659f9d982)) |
| bug fix |  **reports:** omit table header when empty ([6a7fc1ae0731f5cce42b914cb6ad2e0baa6da29e](https://github.com/gnucoop/ajf/commit/6a7fc1ae0731f5cce42b914cb6ad2e0baa6da29e)) |
| bug fix |  **transloco:** add module forRoot function ([9112607f3285647940aa324c303310faa50258bb](https://github.com/gnucoop/ajf/commit/9112607f3285647940aa324c303310faa50258bb)) |
| bug fix |  **transloco:** add prt and eth translations ([3896d220788ee9daf8b0507ed002e540ad7939cd](https://github.com/gnucoop/ajf/commit/3896d220788ee9daf8b0507ed002e540ad7939cd)) |
| feature |  **reports:** pdf printing of dynamic tables ([878c4f275809d4756568528743a134840934aabb](https://github.com/gnucoop/ajf/commit/878c4f275809d4756568528743a134840934aabb)) |

### ionic

|            |                       |
| ---------- | --------------------- |
| bug fix |  **forms:** add css for table fields ([1fba2b44a5e072b548182ab04646ae942f8c78bf](https://github.com/gnucoop/ajf/commit/1fba2b44a5e072b548182ab04646ae942f8c78bf)) |

### material

|            |                       |
| ---------- | --------------------- |
| bug fix |  **reports:** add Layout widget to defaultWidgetsFactory ([c8484d1b6cd7643d210460fb8d1d86c7664c20cf](https://github.com/gnucoop/ajf/commit/c8484d1b6cd7643d210460fb8d1d86c7664c20cf)) |

### ajf

|            |                       |
| ---------- | --------------------- |
| bug fix |  **forms:** table field handling number input by ng if directive ([379449705e09db113081aef59551d6689f29e55b](https://github.com/gnucoop/ajf/commit/379449705e09db113081aef59551d6689f29e55b)) |


# 12.1.0-next.1 "broken-waterfall" (2021-06-22)

### ajf

|            |                       |
| ---------- | --------------------- |
| bug fix |  **multiple:** remove some circular deps in reports modules ([986418751f2c0088950c92b96ec3fe09f08aebe9](https://github.com/gnucoop/ajf/commit/986418751f2c0088950c92b96ec3fe09f08aebe9)) |
| bug fix |  **multiple:** reports default widgets map need to be provided in root ([a0fc21bd576848ff46e26ef40cec1e4adca3329a](https://github.com/gnucoop/ajf/commit/a0fc21bd576848ff46e26ef40cec1e4adca3329a)) |


# 12.1.0-next.0 "crimson-bread" (2021-06-16)

### ajf

|            |                       |
| ---------- | --------------------- |
| bug fix |  **multiple:** approve api change in core/common and material/monaco-editor ([026413fb337a5f118327bc86cb718c1a11718d5c](https://github.com/gnucoop/ajf/commit/026413fb337a5f118327bc86cb718c1a11718d5c)) |


# 12.0.0 "odd-waterfall" (2021-06-10)

### material

|            |                       |
| ---------- | --------------------- |
| feature |  **form-builder:** add show attribute to string identifier  ([a07f752306f8ebe925db45026b1a8bec2850e7c7](https://github.com/gnucoop/ajf/commit/a07f752306f8ebe925db45026b1a8bec2850e7c7)) |


# 12.0.0-next.3 "lucky-cell" (2021-05-31)

### core

|            |                       |
| ---------- | --------------------- |
| bug fix |  **forms:** allows all primitive input types inside a table field table field ([7d629645652954b4a42199f960aae32a45eb42b8](https://github.com/gnucoop/ajf/commit/7d629645652954b4a42199f960aae32a45eb42b8)) |
| bug fix |  **reports:** fix the csv/xsls export of tables with colspan or duplicated header labels ([e0c01fa05a5b68c59835471b10ac3c0c798bdcca](https://github.com/gnucoop/ajf/commit/e0c01fa05a5b68c59835471b10ac3c0c798bdcca)) |

# 12.0.0-next.2 "broken-smoke" (2021-04-23)

### core

|            |                       |
| ---------- | --------------------- |
| bug fix |  **forms:** change NotEmpty validation to check also for empty string ([3e6d1184a61fdd20b4ce42084d6874d5feb7f7af](https://github.com/gnucoop/ajf/commit/3e6d1184a61fdd20b4ce42084d6874d5feb7f7af)) |
| bug fix |  **forms:** fix values in form-to-pdf for single and multiple choices fields ([95d69989a05c8fc648bb175f3f7ee01851dddd6b](https://github.com/gnucoop/ajf/commit/95d69989a05c8fc648bb175f3f7ee01851dddd6b)) |


## 11.1.1 "wispy-math" (2021-03-26)

### core

|            |                       |
| ---------- | --------------------- |
| bug fix |  **reports:** fixed the export of the csv, now shows the value without the saveValue warning ([ad4a07dc47d434b56d233cbae531b07c127eb513](https://github.com/gnucoop/ajf/commit/ad4a07dc47d434b56d233cbae531b07c127eb513)) |
| feature |  **forms:** improve form-to-pdf api ([06f846da01e98f532e1e792e088d5b876fba6f4d](https://github.com/gnucoop/ajf/commit/06f846da01e98f532e1e792e088d5b876fba6f4d)) |

### material

|            |                       |
| ---------- | --------------------- |
| feature |  **form-builder:** Added Drag & Drop functionalities. ([450fba6b49d14575eeb8a356c549afa83bf9c0b1](https://github.com/gnucoop/ajf/commit/450fba6b49d14575eeb8a356c549afa83bf9c0b1)) |

### ajf

|            |                       |
| ---------- | --------------------- |
| feature |  **page-slider:** add disableRemoval mode in repeating slide ([afee0dca762ffc92fa901de34e639827d92ddf28](https://github.com/gnucoop/ajf/commit/afee0dca762ffc92fa901de34e639827d92ddf28)) |


# 12.0.0-next.1 "quiet-cloud" (2021-03-24)

### core

|            |                       |
| ---------- | --------------------- |
| bug fix |  **forms:** fix FormSchema interface in form-to-pdf ([010eefb125d927bbb84626d4919cd0e743148e98](https://github.com/gnucoop/ajf/commit/010eefb125d927bbb84626d4919cd0e743148e98)) |
| bug fix |  **reports:** fixed the export of the csv, now shows the value without the saveValue warning ([a5f7bbc676d1e25af5016a4389b681c78eaa25fc](https://github.com/gnucoop/ajf/commit/a5f7bbc676d1e25af5016a4389b681c78eaa25fc)) |
| feature |  **forms:** improve form-to-pdf api ([4e430ec0b5828f3b32623e7c121691741a6859a3](https://github.com/gnucoop/ajf/commit/4e430ec0b5828f3b32623e7c121691741a6859a3)) |

### material

|            |                       |
| ---------- | --------------------- |
| feature |  **form-builder:** Added Drag & Drop functionalities. ([e611a24b26bba1b94ee4837ad7f35c636463c083](https://github.com/gnucoop/ajf/commit/e611a24b26bba1b94ee4837ad7f35c636463c083)) |

### ajf

|            |                       |
| ---------- | --------------------- |
| feature |  **page-slider:** add disableRemoval mode in repeating slide ([91bfeaa85d6bc78174219683be55d38bfbc7b36f](https://github.com/gnucoop/ajf/commit/91bfeaa85d6bc78174219683be55d38bfbc7b36f)) |


# 12.0.0-next.0 "odd-scene" (2021-03-12)

update to angular 12

## 11.0.8 "fancy-fog" (2021-03-08)

### core

|            |                       |
| ---------- | --------------------- |
| feature |  **forms:** form-to-pdf ([20b4cd706af0b4513bda25f4341eda17051b6f8e](https://github.com/gnucoop/ajf/commit/20b4cd706af0b4513bda25f4341eda17051b6f8e)) |
| feature |  **reports:** set image width from styles ([7359a03c7851fcf40734a911b0b0c83e226c008c](https://github.com/gnucoop/ajf/commit/7359a03c7851fcf40734a911b0b0c83e226c008c)) |

### material

|            |                       |
| ---------- | --------------------- |
| bug fix |  **form-builder:** output form should not repeat choice values for every choice field ([7a252557190dda86debba9a90fb25dc569ab5b8c](https://github.com/gnucoop/ajf/commit/7a252557190dda86debba9a90fb25dc569ab5b8c)) |
| feature |  **report-builder:** add hint to field node properties ([b33458344f8b69bbe9ab86d9f8e32996394cb0c3](https://github.com/gnucoop/ajf/commit/b33458344f8b69bbe9ab86d9f8e32996394cb0c3)) |


## 11.0.7 "internal-sweater" (2021-02-04)

### core

|            |                       |
| ---------- | --------------------- |
| bug fix |  **forms:** add label instead of value for field with choices into form string identifier ([da1711f446f640e12b331d81cd800de51a1298ce](https://github.com/gnucoop/ajf/commit/da1711f446f640e12b331d81cd800de51a1298ce)) |
| feature |  **forms:**  make a field read-only from the schema ([41b06ef6932eecd0ebe71c57785d9f4d26347933](https://github.com/gnucoop/ajf/commit/41b06ef6932eecd0ebe71c57785d9f4d26347933)) |

### ajf

|            |                       |
| ---------- | --------------------- |
| feature |  **form:** add hint ([e02071eb8d3a39150d8fdf907c3d0616fe9707fc](https://github.com/gnucoop/ajf/commit/e02071eb8d3a39150d8fdf907c3d0616fe9707fc)) |


## 11.0.6 "plain-violet" (2021-01-18)

### core

|            |                       |
| ---------- | --------------------- |
| bug fix |  **forms:** slide validity is not correctly initialized ([84565de27ecc266d02e66dec045f0ebdb45d2a0b](https://github.com/gnucoop/ajf/commit/84565de27ecc266d02e66dec045f0ebdb45d2a0b)) |
| bug fix |  **reports:** add exportable attribute in table widget instance ([668cb085b7e2e92a048d53a7261917e1c730fa48](https://github.com/gnucoop/ajf/commit/668cb085b7e2e92a048d53a7261917e1c730fa48)) |

### material

|            |                       |
| ---------- | --------------------- |
| bug fix |  **form:** input field ([6dc1406211e6609ad31769e67c6b249b43e1d1d0](https://github.com/gnucoop/ajf/commit/6dc1406211e6609ad31769e67c6b249b43e1d1d0)) |

### ajf

|            |                       |
| ---------- | --------------------- |
| bug fix |  **report-to-pdf:** fix retrieval of chart's canvasDataUrl in material component ([4f2dee2e93a302c22c249d38484c78daa2d103e7](https://github.com/gnucoop/ajf/commit/4f2dee2e93a302c22c249d38484c78daa2d103e7)) |


## 11.0.5 "gentle-band" (2020-12-04)

### core

|            |                       |
| ---------- | --------------------- |
| feature |  **forms:** add pipe to build string from string identifier ([3fa1ceb5717cb39b1db3cfeb19ab4155e6c3d4be](https://github.com/gnucoop/ajf/commit/3fa1ceb5717cb39b1db3cfeb19ab4155e6c3d4be)) |
| feature |  **reports:** add pipe to build string from string identifier ([2c585f5a71340f4b50ec1aa24264f0452973ddfa](https://github.com/gnucoop/ajf/commit/2c585f5a71340f4b50ec1aa24264f0452973ddfa)) |


## 11.0.4 "bitter-dream" (2020-12-04)

### core

|            |                       |
| ---------- | --------------------- |
| bug fix |  **common:** buildStringIdentifier is not exported ([a34307bfa0bbd47a86320fa5c6247c8aa1c7a32a](https://github.com/gnucoop/ajf/commit/a34307bfa0bbd47a86320fa5c6247c8aa1c7a32a)) |


## 11.0.3 "late-sound" (2020-12-03)

### core

|            |                       |
| ---------- | --------------------- |
| bug fix |  **reports:** widget wrapper inside export container has zero height ([e34d94044084cbfad02f9a018bcd7c2f68ae5266](https://github.com/gnucoop/ajf/commit/e34d94044084cbfad02f9a018bcd7c2f68ae5266)) |
| feature |  **common:** add helper to build a string from a string identifier ([b2f03b11038fd9f8cd4904334925eb9bc57fc793](https://github.com/gnucoop/ajf/commit/b2f03b11038fd9f8cd4904334925eb9bc57fc793)) |
| feature |  **reports:** add string identifier in report interface ([6e3abab375de3aaaa86c082bb5acefaf233e98e0](https://github.com/gnucoop/ajf/commit/6e3abab375de3aaaa86c082bb5acefaf233e98e0)) |


## 11.0.2 "shy-term" (2020-11-30)

### ajf

|            |                       |
| ---------- | --------------------- |
| bug fix |  **forms:** formula fields must be readonly inputs ([93c2819c8231e990e3b1f3a30dc20275aa2a2408](https://github.com/gnucoop/ajf/commit/93c2819c8231e990e3b1f3a30dc20275aa2a2408)) |


## 11.0.1 "delicate-queen" (2020-11-30)

### core

|            |                       |
| ---------- | --------------------- |
| bug fix |  **forms:** show labels for select fields when readonly ([ddac4e635f319ccf9a9c973769e39976d900bc9c](https://github.com/gnucoop/ajf/commit/ddac4e635f319ccf9a9c973769e39976d900bc9c)) |

### ajf

|            |                       |
| ---------- | --------------------- |
| bug fix |  approve api change in core/chart and core/reports ([c2a01b9e8b97ef2a011a135f8c3eb838ef35006f](https://github.com/gnucoop/ajf/commit/c2a01b9e8b97ef2a011a135f8c3eb838ef35006f)) |
| feature |  report-to-pdf ([2d15b6a4df5e5e837aa42363ce3cc0772b1f870b](https://github.com/gnucoop/ajf/commit/2d15b6a4df5e5e837aa42363ce3cc0772b1f870b)) |


# 11.0.0 "divine-cell" (2020-11-20)

### ajf

|            |                       |
| ---------- | --------------------- |
| bug fix |  approve api changes in core forms ([9c23817c4b56829402b06802fe31a718d8cec110](https://github.com/gnucoop/ajf/commit/9c23817c4b56829402b06802fe31a718d8cec110)) |
| bug fix |  lint errors ([2380a0a69dc7855a05b6fe51b424e34e287be657](https://github.com/gnucoop/ajf/commit/2380a0a69dc7855a05b6fe51b424e34e287be657)) |
| feature |  add support for TypeScript 4.0 ([173aec1fcc197c5bdfd28a0aba00d79b583eb8ba](https://github.com/gnucoop/ajf/commit/173aec1fcc197c5bdfd28a0aba00d79b583eb8ba)) |


## 10.0.6 "misty-cherry" (2020-10-21)

### ionic

|            |                       |
| ---------- | --------------------- |
| bug fix |  **forms:** render table header as text ([5accdfbda94a3e05c5381591e8e1d0913d62a946](https://github.com/gnucoop/ajf/commit/5accdfbda94a3e05c5381591e8e1d0913d62a946)) |

### material

|            |                       |
| ---------- | --------------------- |
| bug fix |  **forms:** render table header as text ([3240bfc0697f8d96b261f1dfadc6e74cc17e04d1](https://github.com/gnucoop/ajf/commit/3240bfc0697f8d96b261f1dfadc6e74cc17e04d1)) |

### ajf

|            |                       |
| ---------- | --------------------- |
| bug fix |  **dev-app:** ionic widgets demo layout ([f81cdc30d1db198b434ce08a097015298c1fe89d](https://github.com/gnucoop/ajf/commit/f81cdc30d1db198b434ce08a097015298c1fe89d)) |


## 10.0.5 "sweet-firefly" (2020-08-28)

### core

|            |                       |
| ---------- | --------------------- |
| feature |  **reports:** add support for user defined init functions in custom widgets ([6d0c7888bb217bd1d5d27f44116f844dac1fdd0d](https://github.com/gnucoop/ajf/commit/6d0c7888bb217bd1d5d27f44116f844dac1fdd0d)) |


## 10.0.4 "sparkling-limit" (2020-08-21)

### core

|            |                       |
| ---------- | --------------------- |
| feature |  **reports:** add AjfWidgetService for custom widgets definition ([81d5ed084f78a8024b25d12194a2843f1d4c6989](https://github.com/gnucoop/ajf/commit/81d5ed084f78a8024b25d12194a2843f1d4c6989)) |

### ionic

|            |                       |
| ---------- | --------------------- |
| feature |  **reports:** add support for custom report widgets definition ([f43b6005dc25e625848951a3a393d51c44ec010e](https://github.com/gnucoop/ajf/commit/f43b6005dc25e625848951a3a393d51c44ec010e)) |

### material

|            |                       |
| ---------- | --------------------- |
| bug fix |  **forms:** approve api change ([6e41ff869f8f02dfb39e6ddd0e3a6ddc0a0bc8f7](https://github.com/gnucoop/ajf/commit/6e41ff869f8f02dfb39e6ddd0e3a6ddc0a0bc8f7)) |
| feature |  **reports:** add support for custom report widgets definition ([9bcd57f5cdc3a00c3b5faccbdc03ba47c96cd979](https://github.com/gnucoop/ajf/commit/9bcd57f5cdc3a00c3b5faccbdc03ba47c96cd979)) |


## 10.0.3 "bitter-breeze" (2020-08-06)

### material

|            |                       |
| ---------- | --------------------- |
| feature |  **forms:** render text fields in a text area ([ea2f70a308b8d4a4a8b09824add65df62bff5061](https://github.com/gnucoop/ajf/commit/ea2f70a308b8d4a4a8b09824add65df62bff5061)) |


## 10.0.2 "rapid-butterfly" (2020-06-30)

### core

|            |                       |
| ---------- | --------------------- |
| bug fix |  **reports:** translate table cells and chart labels ([8cc764f51270a81481bf9942e59f930ac2dab742](https://github.com/gnucoop/ajf/commit/8cc764f51270a81481bf9942e59f930ac2dab742)) |


## 10.0.1 "jolly-queen" (2020-06-29)


# 10.0.0 "nameless-mode" (2020-06-26)

### core

|            |                       |
| ---------- | --------------------- |
| bug fix |  **chart:** remove unused chart piecelabel plugin ([2d4d49daf3271d2907a4372aa8e37c11e6dff150](https://github.com/gnucoop/ajf/commit/2d4d49daf3271d2907a4372aa8e37c11e6dff150)) |
| bug fix |  **file-input:** add missing param in content children decorators ([0e143a4b97fee57198265d4c07f6ed83871de043](https://github.com/gnucoop/ajf/commit/0e143a4b97fee57198265d4c07f6ed83871de043)) |
| bug fix |  **file-input:** use normal cursor when the value is not null ([dbc1888ed2316a915e4cfa0638cbc18a86e02c57](https://github.com/gnucoop/ajf/commit/dbc1888ed2316a915e4cfa0638cbc18a86e02c57)) |
| bug fix |  **file-input:** value not set on file select ([13de9fbfb1a451331563dac0e3dff2fef00927d2](https://github.com/gnucoop/ajf/commit/13de9fbfb1a451331563dac0e3dff2fef00927d2)) |
| bug fix |  **forms:** hide file preview in read only mode w/ null value ([843e28030aa487d1e471a9c8104dacbecc264cac](https://github.com/gnucoop/ajf/commit/843e28030aa487d1e471a9c8104dacbecc264cac)) |
| bug fix |  **forms:** hide image preview in read only mode w/ null value ([f645e0b4c6b080215667b3e9ce7ee331f9e0f07a](https://github.com/gnucoop/ajf/commit/f645e0b4c6b080215667b3e9ce7ee331f9e0f07a)) |
| feature |  **chart:** add support for chart.js callback functions ([4a371227efb89d462e79fa32a2f357e1734af58d](https://github.com/gnucoop/ajf/commit/4a371227efb89d462e79fa32a2f357e1734af58d)) |
| feature |  **file-input:** add accept input to limit file mime type ([6840281727b30f6d72260d478ea60b3e573f01a3](https://github.com/gnucoop/ajf/commit/6840281727b30f6d72260d478ea60b3e573f01a3)) |
| feature |  **file-input:** add file input component ([62d7551fc7592be0a243eea4be4e034c2cc5aa49](https://github.com/gnucoop/ajf/commit/62d7551fc7592be0a243eea4be4e034c2cc5aa49)) |
| feature |  **forms:** add file field ([fc2b0664d03bab43380de8f5549f80de19fd0e4e](https://github.com/gnucoop/ajf/commit/fc2b0664d03bab43380de8f5549f80de19fd0e4e)) |
| feature |  **forms:** add image field ([14dfa1c11800a30ca8d80f1af7709430ea0ab2e9](https://github.com/gnucoop/ajf/commit/14dfa1c11800a30ca8d80f1af7709430ea0ab2e9)) |
| feature |  **forms:** add new file field type ([99eb88937154fdab5483c9d8a3b57b08d98b76ee](https://github.com/gnucoop/ajf/commit/99eb88937154fdab5483c9d8a3b57b08d98b76ee)) |
| feature |  **forms:** add video url field type ([5d84a7dcadd30a6399e9204c127997fcaf7997b9](https://github.com/gnucoop/ajf/commit/5d84a7dcadd30a6399e9204c127997fcaf7997b9)) |
| feature |  **testing:** add private helpers for e2e tests ([aeaac2e11e96a71259e2725ede944544540ecc95](https://github.com/gnucoop/ajf/commit/aeaac2e11e96a71259e2725ede944544540ecc95)) |

### ionic

|            |                       |
| ---------- | --------------------- |
| feature |  **forms:** add video url field component ([7bbb1cb432e732f15e2c512f1b2da69f3cdcab50](https://github.com/gnucoop/ajf/commit/7bbb1cb432e732f15e2c512f1b2da69f3cdcab50)) |

### material

|            |                       |
| ---------- | --------------------- |
| bug fix |  **form-builder:** formulae and conditions not updated in UI ([83a2ebba5098d09716d08cb7e2f9080553f50f6e](https://github.com/gnucoop/ajf/commit/83a2ebba5098d09716d08cb7e2f9080553f50f6e)) |
| bug fix |  **form-builder:** messy code after cherry pick ([68f52058c5db2e0614cee8865143da84fc774dc9](https://github.com/gnucoop/ajf/commit/68f52058c5db2e0614cee8865143da84fc774dc9)) |
| feature |  **forms:** add video url field component ([94b0b58ffd6867a58cc12b728b94756be5e5b5aa](https://github.com/gnucoop/ajf/commit/94b0b58ffd6867a58cc12b728b94756be5e5b5aa)) |

### ajf

|            |                       |
| ---------- | --------------------- |
| feature |  report warning if duplicate theme styles are generated ([bfc59fd0c01762bbbd8b18844d8fb4976d996343](https://github.com/gnucoop/ajf/commit/bfc59fd0c01762bbbd8b18844d8fb4976d996343)) |


# 10.0.0-next.0 "jolly-field" (2020-05-14)

### material

|            |                       |
| ---------- | --------------------- |
| bug fix |  **barcode:** file drop not working ([4fa778d2d7b06638bce9da9fac23431dac95ebeb](https://github.com/gnucoop/ajf/commit/4fa778d2d7b06638bce9da9fac23431dac95ebeb)) |

### core

|            |                       |
| ---------- | --------------------- |
| bug fix |  **forms:** include missing templates in ng_module bazel target ([3489afd27677c986f2c2a807cf02e4915f46aac4](https://github.com/gnucoop/ajf/commit/3489afd27677c986f2c2a807cf02e4915f46aac4)) |
| bug fix |  **forms:** initialize choices origin in form renderer ([ccecfe0ac573bd8c0f0c43ee6fbf7b211259170d](https://github.com/gnucoop/ajf/commit/ccecfe0ac573bd8c0f0c43ee6fbf7b211259170d)) |
| feature |  **reports:** add dynamic table widget ([9c4e76e6982b91d6ffb30af7f89718796fd1b0fd](https://github.com/gnucoop/ajf/commit/9c4e76e6982b91d6ffb30af7f89718796fd1b0fd)) |