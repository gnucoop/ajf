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

// primary entry-point which is empty as of version 9. All components should
// be imported through their individual entry-points. This file is needed to
// satisfy the "ng_package" bazel rule which also requires a primary entry-point.

// Workaround for: https://github.com/microsoft/rushstack/issues/2806.
// This is a private export that can be removed at any time.
export const ɵɵtsModuleIndicatorApiExtractorWorkaround = true;
