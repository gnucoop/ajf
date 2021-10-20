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

import {AjfReport} from '../interface/reports/report';
import {AjfReportContainer} from '../interface/reports/report-container';
import {createReport} from '../utils/reports/create-report';
import {AjfReportContainerSerializer} from './report-container-serializer';

export class AjfReportSerializer {
  static fromJson(json: Partial<AjfReport>): AjfReport {
    const containers: (keyof AjfReport)[] = ['header', 'footer', 'content'];
    containers.forEach(c => {
      if (json[c]) {
        (json[c] as AjfReportContainer) = AjfReportContainerSerializer.fromJson(
          json[c] as Partial<AjfReportContainer>,
        );
      }
    });
    return createReport(json);
  }
}
