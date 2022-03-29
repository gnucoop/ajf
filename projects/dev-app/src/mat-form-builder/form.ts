/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

export const formSchema: any = {
  'nodes': [
    {
      'id': 3,
      'name': 'supplemention',
      'label': '3. SUPPLEMENTATION',
      'nodes': [
        {
          'id': 3003,
          'name': 'vitamin_a_table',
          'rows': [
            [
              'vitamin_a_table__0__0',
              'vitamin_a_table__0__1',
              {
                'formula':
                  "dob&&vitamin_a_table__0__0?(Date.parse(vitamin_a_table__0__0)-Date.parse(dob))/3.154e10 >= 1 ? Math.floor((Date.parse(vitamin_a_table__0__0)-Date.parse(dob))/3.154e10) + ' years' : Math.floor((Date.parse(vitamin_a_table__0__0)-Date.parse(dob))/2.628e9) + ' months':''",
                'editable': false,
              },
            ],
            [
              'vitamin_a_table__1__0',
              'vitamin_a_table__1__1',
              {
                'formula':
                  "dob&&vitamin_a_table__1__0?(Date.parse(vitamin_a_table__1__0)-Date.parse(dob))/3.154e10 >= 1 ? Math.floor((Date.parse(vitamin_a_table__1__0)-Date.parse(dob))/3.154e10) + ' years' : Math.floor((Date.parse(vitamin_a_table__1__0)-Date.parse(dob))/2.628e9) + ' months':''",
                'editable': false,
              },
            ],
            [
              'vitamin_a_table__2__0',
              'vitamin_a_table__2__1',
              {
                'formula':
                  "dob&&vitamin_a_table__2__0?(Date.parse(vitamin_a_table__2__0)-Date.parse(dob))/3.154e10 >= 1 ? Math.floor((Date.parse(vitamin_a_table__2__0)-Date.parse(dob))/3.154e10) + ' years' : Math.floor((Date.parse(vitamin_a_table__2__0)-Date.parse(dob))/2.628e9) + ' months':''",
                'editable': false,
              },
            ],
            [
              'vitamin_a_table__3__0',
              'vitamin_a_table__3__1',
              {
                'formula':
                  "dob&&vitamin_a_table__3__0?(Date.parse(vitamin_a_table__3__0)-Date.parse(dob))/3.154e10 >= 1 ? Math.floor((Date.parse(vitamin_a_table__3__0)-Date.parse(dob))/3.154e10) + ' years' : Math.floor((Date.parse(vitamin_a_table__3__0)-Date.parse(dob))/2.628e9) + ' months':''",
                'editable': false,
              },
            ],
            [
              'vitamin_a_table__4__0',
              'vitamin_a_table__4__1',
              {
                'formula':
                  "dob&&vitamin_a_table__4__0?(Date.parse(vitamin_a_table__4__0)-Date.parse(dob))/3.154e10 >= 1 ? Math.floor((Date.parse(vitamin_a_table__4__0)-Date.parse(dob))/3.154e10) + ' years' : Math.floor((Date.parse(vitamin_a_table__4__0)-Date.parse(dob))/2.628e9) + ' months':''",
                'editable': false,
              },
            ],
            [
              'vitamin_a_table__5__0',
              'vitamin_a_table__5__1',
              {
                'formula':
                  "dob&&vitamin_a_table__5__0?(Date.parse(vitamin_a_table__5__0)-Date.parse(dob))/3.154e10 >= 1 ? Math.floor((Date.parse(vitamin_a_table__5__0)-Date.parse(dob))/3.154e10) + ' years' : Math.floor((Date.parse(vitamin_a_table__5__0)-Date.parse(dob))/2.628e9) + ' months':''",
                'editable': false,
              },
            ],
            [
              'vitamin_a_table__6__0',
              'vitamin_a_table__6__1',
              {
                'formula':
                  "dob&&vitamin_a_table__6__0?(Date.parse(vitamin_a_table__6__0)-Date.parse(dob))/3.154e10 >= 1 ? Math.floor((Date.parse(vitamin_a_table__6__0)-Date.parse(dob))/3.154e10) + ' years' : Math.floor((Date.parse(vitamin_a_table__6__0)-Date.parse(dob))/2.628e9) + ' months':''",
                'editable': false,
              },
            ],
            [
              'vitamin_a_table__7__0',
              'vitamin_a_table__7__1',
              {
                'formula':
                  "dob&&vitamin_a_table__7__0?(Date.parse(vitamin_a_table__7__0)-Date.parse(dob))/3.154e10 >= 1 ? Math.floor((Date.parse(vitamin_a_table__7__0)-Date.parse(dob))/3.154e10) + ' years' : Math.floor((Date.parse(vitamin_a_table__7__0)-Date.parse(dob))/2.628e9) + ' months':''",
                'editable': false,
              },
            ],
            [
              'vitamin_a_table__8__0',
              'vitamin_a_table__8__1',
              {
                'formula':
                  "dob&&vitamin_a_table__8__0?(Date.parse(vitamin_a_table__8__0)-Date.parse(dob))/3.154e10 >= 1 ? Math.floor((Date.parse(vitamin_a_table__8__0)-Date.parse(dob))/3.154e10) + ' years' : Math.floor((Date.parse(vitamin_a_table__8__0)-Date.parse(dob))/2.628e9) + ' months':''",
                'editable': false,
              },
            ],
            [
              'vitamin_a_table__9__0',
              'vitamin_a_table__9__1',
              {
                'formula':
                  "dob&&vitamin_a_table__9__0?(Date.parse(vitamin_a_table__9__0)-Date.parse(dob))/3.154e10 >= 1 ? Math.floor((Date.parse(vitamin_a_table__9__0)-Date.parse(dob))/3.154e10) + ' years' : Math.floor((Date.parse(vitamin_a_table__9__0)-Date.parse(dob))/2.628e9) + ' months':''",
                'editable': false,
              },
            ],
          ],
          'size': 'normal',
          'label': 'Vitamin A',
          'parent': 3,
          'editable': true,
          'nodeType': 0,
          'fieldType': 11,
          'rowLabels': [
            '1\u00b0',
            '2\u00b0',
            '3\u00b0',
            '4\u00b0',
            '5\u00b0',
            '6\u00b0',
            '7\u00b0',
            '8\u00b0',
            '9\u00b0',
            '10\u00b0',
          ],
          'parentNode': 0,
          'visibility': {
            'condition': 'vit_a',
          },
          'columnTypes': ['date', 'text'],
          'columnLabels': ['date', 'ass.', 'age'],
          'defaultValue': null,
          'conditionalBranches': [],
        },
      ],
      'parent': 0,
      'nodeType': 3,
    },
  ],
  'choicesOrigins': [
    {
      'name': 'district',
      'type': 'fixed',
      'choices': [
        {
          'label': 'Ancuabe',
          'value': 'ancuabe',
          'province': 'cabo_delgado',
        },
        {
          'label': 'Balama',
          'value': 'balama',
          'province': 'cabo_delgado',
        },
        {
          'label': 'Chiure',
          'value': 'chiure',
          'province': 'cabo_delgado',
        },
        {
          'label': 'Ibo',
          'value': 'ibo',
          'province': 'cabo_delgado',
        },
        {
          'label': 'Macomia',
          'value': 'macomia',
          'province': 'cabo_delgado',
        },
        {
          'label': 'Mac\u00f9fi',
          'value': 'mac\u00f9fi',
          'province': 'cabo_delgado',
        },
        {
          'label': 'Maluc',
          'value': 'maluc',
          'province': 'cabo_delgado',
        },
        {
          'label': 'Mociba da Praia',
          'value': 'mociba_da_praia',
          'province': 'cabo_delgado',
        },
        {
          'label': 'Montepuez',
          'value': 'montepuez',
          'province': 'cabo_delgado',
        },
        {
          'label': 'Mueda',
          'value': 'mueda',
          'province': 'cabo_delgado',
        },
        {
          'label': 'Muidumbe',
          'value': 'muidumbe',
          'province': 'cabo_delgado',
        },
        {
          'label': 'Namuno',
          'value': 'namuno',
          'province': 'cabo_delgado',
        },
        {
          'label': 'Nandade',
          'value': 'nandade',
          'province': 'cabo_delgado',
        },
        {
          'label': 'Palma',
          'value': 'palma',
          'province': 'cabo_delgado',
        },
        {
          'label': 'Pemba-Metuge',
          'value': 'pemba_metuge',
          'province': 'cabo_delgado',
        },
        {
          'label': 'Quissanga',
          'value': 'quissanga',
          'province': 'cabo_delgado',
        },
        {
          'label': 'Bilene',
          'value': 'bilene',
          'province': 'gaza',
        },
        {
          'label': 'Chibuto',
          'value': 'chibuto',
          'province': 'gaza',
        },
        {
          'label': 'Chicualacuala',
          'value': 'chicualacuala',
          'province': 'gaza',
        },
        {
          'label': 'Chigubo',
          'value': 'chigubo',
          'province': 'gaza',
        },
        {
          'label': 'Chokwe',
          'value': 'chokwe',
          'province': 'gaza',
        },
        {
          'label': 'Chonguene',
          'value': 'chonguene',
          'province': 'gaza',
        },
        {
          'label': 'Guija',
          'value': 'guija',
          'province': 'gaza',
        },
        {
          'label': 'Limpopo',
          'value': 'limpopo',
          'province': 'gaza',
        },
        {
          'label': 'Mabalane',
          'value': 'mabalane',
          'province': 'gaza',
        },
        {
          'label': 'Manjacaze',
          'value': 'manjacaze',
          'province': 'gaza',
        },
        {
          'label': 'Mapai',
          'value': 'mapai',
          'province': 'gaza',
        },
        {
          'label': 'Massangena',
          'value': 'massangena',
          'province': 'gaza',
        },
        {
          'label': 'Massingir',
          'value': 'massingir',
          'province': 'gaza',
        },
        {
          'label': 'Xai-Xai',
          'value': 'xai_xai',
          'province': 'gaza',
        },
        {
          'label': 'Funhalouro',
          'value': 'funhalouro',
          'province': 'inhambane',
        },
        {
          'label': 'Govuro',
          'value': 'govuro',
          'province': 'inhambane',
        },
        {
          'label': 'Homoine',
          'value': 'homoine',
          'province': 'inhambane',
        },
        {
          'label': 'Inharrime',
          'value': 'inharrime',
          'province': 'inhambane',
        },
        {
          'label': 'Inhassoro',
          'value': 'inhassoro',
          'province': 'inhambane',
        },
        {
          'label': 'Jangamo',
          'value': 'jangamo',
          'province': 'inhambane',
        },
        {
          'label': 'Mabote',
          'value': 'mabote',
          'province': 'inhambane',
        },
        {
          'label': 'Massinga',
          'value': 'massinga',
          'province': 'inhambane',
        },
        {
          'label': 'Morrumbene',
          'value': 'morrumbene',
          'province': 'inhambane',
        },
        {
          'label': 'Panda',
          'value': 'panda',
          'province': 'inhambane',
        },
        {
          'label': 'Vilanculos',
          'value': 'vilanculos',
          'province': 'inhambane',
        },
        {
          'label': 'Zavala',
          'value': 'zavala',
          'province': 'inhambane',
        },
        {
          'label': 'B\u00e1ru\u00e8',
          'value': 'b\u00e1ru\u00e8',
          'province': 'manica',
        },
        {
          'label': 'Gondola',
          'value': 'gondola',
          'province': 'manica',
        },
        {
          'label': 'Guro',
          'value': 'guro',
          'province': 'manica',
        },
        {
          'label': 'Machaze',
          'value': 'machaze',
          'province': 'manica',
        },
        {
          'label': 'Macossa',
          'value': 'macossa',
          'province': 'manica',
        },
        {
          'label': 'Manica',
          'value': 'manica',
          'province': 'manica',
        },
        {
          'label': 'Mossurize',
          'value': 'mossurize',
          'province': 'manica',
        },
        {
          'label': 'Sussundenga',
          'value': 'sussundenga',
          'province': 'manica',
        },
        {
          'label': 'Tambara',
          'value': 'tambara',
          'province': 'manica',
        },
        {
          'label': 'Maputo',
          'value': 'maputo',
          'province': 'maputo_city',
        },
        {
          'label': 'Boane',
          'value': 'boane',
          'province': 'maputo_province',
        },
        {
          'label': 'Magude',
          'value': 'magude',
          'province': 'maputo_province',
        },
        {
          'label': 'Manhi\u00e7a',
          'value': 'manhi\u00e7a',
          'province': 'maputo_province',
        },
        {
          'label': 'Marracuene',
          'value': 'marracuene',
          'province': 'maputo_province',
        },
        {
          'label': 'Matutu\u00edne',
          'value': 'matutu\u00edne',
          'province': 'maputo_province',
        },
        {
          'label': 'Moamba',
          'value': 'moamba',
          'province': 'maputo_province',
        },
        {
          'label': 'Namaacha',
          'value': 'namaacha',
          'province': 'maputo_province',
        },
        {
          'label': 'Angoche',
          'value': 'angoche',
          'province': 'nampula',
        },
        {
          'label': 'Er\u00e1ti',
          'value': 'er\u00e1ti',
          'province': 'nampula',
        },
        {
          'label': 'Lalaua',
          'value': 'lalaua',
          'province': 'nampula',
        },
        {
          'label': 'Malema',
          'value': 'malema',
          'province': 'nampula',
        },
        {
          'label': 'Meconta',
          'value': 'meconta',
          'province': 'nampula',
        },
        {
          'label': 'Mecub\u00fari',
          'value': 'mecuburi',
          'province': 'nampula',
        },
        {
          'label': 'Memba',
          'value': 'memba',
          'province': 'nampula',
        },
        {
          'label': 'Mogincual',
          'value': 'mogincual',
          'province': 'nampula',
        },
        {
          'label': 'Mogovolas',
          'value': 'mogovolas',
          'province': 'nampula',
        },
        {
          'label': 'Moma',
          'value': 'moma',
          'province': 'nampula',
        },
        {
          'label': 'Monapo',
          'value': 'monapo',
          'province': 'nampula',
        },
        {
          'label': 'Mossuril',
          'value': 'mossuril',
          'province': 'nampula',
        },
        {
          'label': 'Muecate',
          'value': 'muecate',
          'province': 'nampula',
        },
        {
          'label': 'Murrupula',
          'value': 'murrupula',
          'province': 'nampula',
        },
        {
          'label': 'Nacala-a-Velha',
          'value': 'nacala_a_velha',
          'province': 'nampula',
        },
        {
          'label': 'Nacar\u00f4a',
          'value': 'nacaroa',
          'province': 'nampula',
        },
        {
          'label': 'Nampula',
          'value': 'nampula',
          'province': 'nampula',
        },
        {
          'label': 'Rib\u00e1u\u00e8',
          'value': 'ribaue',
          'province': 'nampula',
        },
        {
          'label': 'Cuamba',
          'value': 'cuamba',
          'province': 'niassa',
        },
        {
          'label': 'Lago',
          'value': 'lago',
          'province': 'niassa',
        },
        {
          'label': 'Lichinga',
          'value': 'lichinga',
          'province': 'niassa',
        },
        {
          'label': 'Majune',
          'value': 'majune',
          'province': 'niassa',
        },
        {
          'label': 'Mandimba',
          'value': 'mandimba',
          'province': 'niassa',
        },
        {
          'label': 'Marrupa',
          'value': 'marrupa',
          'province': 'niassa',
        },
        {
          'label': 'Ma\u00faa',
          'value': 'maua',
          'province': 'niassa',
        },
        {
          'label': 'Mavagoago',
          'value': 'mavagoago',
          'province': 'niassa',
        },
        {
          'label': 'Mecanhelas',
          'value': 'mecanhelas',
          'province': 'niassa',
        },
        {
          'label': 'Mecula',
          'value': 'mecula',
          'province': 'niassa',
        },
        {
          'label': 'Metarica',
          'value': 'metarica',
          'province': 'niassa',
        },
        {
          'label': 'Muembe',
          'value': 'muembe',
          'province': 'niassa',
        },
        {
          'label': "N'gauma",
          'value': 'ngauma',
          'province': 'niassa',
        },
        {
          'label': 'Nipepe',
          'value': 'nipepe',
          'province': 'niassa',
        },
        {
          'label': 'Sanga',
          'value': 'sanga',
          'province': 'niassa',
        },
        {
          'label': 'Buzi',
          'value': 'buzi',
          'province': 'sofala',
        },
        {
          'label': 'Caia',
          'value': 'caia',
          'province': 'sofala',
        },
        {
          'label': 'Chemba',
          'value': 'chemba',
          'province': 'sofala',
        },
        {
          'label': 'Cheringoma',
          'value': 'cheringoma',
          'province': 'sofala',
        },
        {
          'label': 'Chibabava',
          'value': 'chibabava',
          'province': 'sofala',
        },
        {
          'label': 'Dondo',
          'value': 'dondo',
          'province': 'sofala',
        },
        {
          'label': 'Gorongosa',
          'value': 'gorongosa',
          'province': 'sofala',
        },
        {
          'label': 'Marromeu',
          'value': 'marromeu',
          'province': 'sofala',
        },
        {
          'label': 'Machanga',
          'value': 'machanga',
          'province': 'sofala',
        },
        {
          'label': 'Maringu\u00e9',
          'value': 'maringue',
          'province': 'sofala',
        },
        {
          'label': 'Muanza',
          'value': 'muanza',
          'province': 'sofala',
        },
        {
          'label': 'Nhamatanda',
          'value': 'nhamatanda',
          'province': 'sofala',
        },
        {
          'label': 'Ang\u00f3nia',
          'value': 'angonia',
          'province': 'tete',
        },
        {
          'label': 'Cahora-Bassa',
          'value': 'cahora_bassa',
          'province': 'tete',
        },
        {
          'label': 'Changara',
          'value': 'changara',
          'province': 'tete',
        },
        {
          'label': 'Chifunde',
          'value': 'chifunde',
          'province': 'tete',
        },
        {
          'label': 'Chiuta',
          'value': 'chiuta',
          'province': 'tete',
        },
        {
          'label': 'Macanga',
          'value': 'macanga',
          'province': 'tete',
        },
        {
          'label': 'Mago\u00e9',
          'value': 'magoe',
          'province': 'tete',
        },
        {
          'label': 'Mar\u00e1via',
          'value': 'maravia',
          'province': 'tete',
        },
        {
          'label': 'Moatize',
          'value': 'moatize',
          'province': 'tete',
        },
        {
          'label': 'Mutarara',
          'value': 'mutarara',
          'province': 'tete',
        },
        {
          'label': 'Tsangano',
          'value': 'tsangano',
          'province': 'tete',
        },
        {
          'label': 'Zumbo',
          'value': 'zumbo',
          'province': 'tete',
        },
        {
          'label': 'Alto Molocue',
          'value': 'alto_molocue',
          'province': 'zambesia',
        },
        {
          'label': 'Chinde',
          'value': 'chinde',
          'province': 'zambesia',
        },
        {
          'label': 'Gil\u00e9',
          'value': 'gil\u00e9',
          'province': 'zambesia',
        },
        {
          'label': 'Guru\u00e9',
          'value': 'guru\u00e9',
          'province': 'zambesia',
        },
        {
          'label': 'Ile',
          'value': 'ile',
          'province': 'zambesia',
        },
        {
          'label': 'Inhassunge',
          'value': 'inhassunge',
          'province': 'zambesia',
        },
        {
          'label': 'Lugela',
          'value': 'lugela',
          'province': 'zambesia',
        },
        {
          'label': 'Maganja da Costa District',
          'value': 'maganja_costa_district',
          'province': 'zambesia',
        },
        {
          'label': 'Milange',
          'value': 'milange',
          'province': 'zambesia',
        },
        {
          'label': 'Mocuba',
          'value': 'mocuba',
          'province': 'zambesia',
        },
        {
          'label': 'Mopeia',
          'value': 'mopeia',
          'province': 'zambesia',
        },
        {
          'label': 'Morrumbala',
          'value': 'morrumbala',
          'province': 'zambesia',
        },
        {
          'label': 'Namacurra',
          'value': 'namacurra',
          'province': 'zambesia',
        },
        {
          'label': 'Namarroi',
          'value': 'namarroi',
          'province': 'zambesia',
        },
        {
          'label': 'Nicoadala',
          'value': 'nicoadala',
          'province': 'zambesia',
        },
        {
          'label': 'Pebane',
          'value': 'pebane',
          'province': 'zambesia',
        },
      ],
      'choicesType': 'string',
    },
    {
      'name': 'id_child_co',
      'type': 'fixed',
      'choices': [
        {
          'label': 'No option',
          'value': 'no_option',
        },
      ],
      'choicesType': 'string',
    },
    {
      'name': 'mf',
      'type': 'fixed',
      'choices': [
        {
          'label': 'Female',
          'value': 'f',
        },
        {
          'label': 'Male',
          'value': 'm',
        },
      ],
      'choicesType': 'string',
    },
    {
      'name': 'province',
      'type': 'fixed',
      'choices': [
        {
          'label': 'Cabo Delgado',
          'value': 'cabo_delgado',
        },
        {
          'label': 'Gaza',
          'value': 'gaza',
        },
        {
          'label': 'Inhambane',
          'value': 'inhambane',
        },
        {
          'label': 'Manica',
          'value': 'manica',
        },
        {
          'label': 'Maputo City',
          'value': 'maputo_city',
        },
        {
          'label': 'Maputo Province',
          'value': 'maputo_province',
        },
        {
          'label': 'Nampula',
          'value': 'nampula',
        },
        {
          'label': 'Niassa',
          'value': 'niassa',
        },
        {
          'label': 'Sofala',
          'value': 'sofala',
        },
        {
          'label': 'Tete',
          'value': 'tete',
        },
        {
          'label': 'Zambesia',
          'value': 'zambesia',
        },
      ],
      'choicesType': 'string',
    },
    {
      'name': 'village',
      'type': 'fixed',
      'choices': [
        {
          'label': 'Chipenhane',
          'value': 'chipenhane',
          'district': 'chonguene',
        },
        {
          'label': 'Tetene',
          'value': 'tetene',
          'district': 'chonguene',
        },
        {
          'label': 'Nhahulene',
          'value': 'nhahulene',
          'district': 'chonguene',
        },
        {
          'label': 'Emilia Dausse',
          'value': 'emilia dausse',
          'district': 'chonguene',
        },
        {
          'label': 'Selevene',
          'value': 'selevene',
          'district': 'chonguene',
        },
        {
          'label': 'Agostinho Neto',
          'value': 'agostinho_neto',
          'district': 'limpopo',
        },
        {
          'label': 'Chipenhe',
          'value': 'chipenhe',
          'district': 'limpopo',
        },
        {
          'label': 'Quinto Congresso',
          'value': 'quinto_congresso',
          'district': 'limpopo',
        },
        {
          'label': 'Cumbane',
          'value': 'cumbane',
          'district': 'limpopo',
        },
        {
          'label': 'Chicumbane-Sede',
          'value': 'chicumbane_sede',
          'district': 'limpopo',
        },
        {
          'label': 'Chiconela',
          'value': 'chiconela',
          'district': 'limpopo',
        },
        {
          'label': 'Nwadjahane',
          'value': 'nwadjahane',
          'district': 'manjacaze',
        },
        {
          'label': 'Laranjeiras',
          'value': 'laranjeiras',
          'district': 'manjacaze',
        },
        {
          'label': 'Guachene',
          'value': 'guachene',
          'district': 'manjacaze',
        },
        {
          'label': 'Chibonzane',
          'value': 'chibonzane',
          'district': 'manjacaze',
        },
        {
          'label': 'Chigivitane',
          'value': 'chigivitane',
          'district': 'manjacaze',
        },
        {
          'label': 'Mavie',
          'value': 'mavie',
          'district': 'manjacaze',
        },
        {
          'label': 'Bahule',
          'value': 'bahule',
          'district': 'manjacaze',
        },
        {
          'label': 'Dengoine',
          'value': 'dengoine',
          'district': 'manjacaze',
        },
        {
          'label': 'Madendere',
          'value': 'madendere',
          'district': 'manjacaze',
        },
        {
          'label': 'Mutane',
          'value': 'mutane',
          'district': 'manjacaze',
        },
        {
          'label': 'Matsinhane',
          'value': 'matsinhane',
          'district': 'manjacaze',
        },
        {
          'label': 'Cuco',
          'value': 'cuco',
          'district': 'manjacaze',
        },
        {
          'label': 'Chilaulene',
          'value': 'chilaulene',
          'district': 'xai_xai',
        },
        {
          'label': 'Zimilene',
          'value': 'zimilene',
          'district': 'xai_xai',
        },
      ],
      'choicesType': 'string',
    },
    {
      'name': 'yn',
      'type': 'fixed',
      'choices': [
        {
          'label': 'Yes',
          'value': 'yes',
        },
        {
          'label': 'No',
          'value': 'no',
        },
      ],
      'choicesType': 'string',
    },
  ],
};
