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

/**
 * Configuration options for editor scrollbars
 */
export interface IEditorScrollbarOptions {
    /**
     * The size of arrows (if displayed).
     * Defaults to 11.
     */
    arrowSize?: number;
    /**
     * Render vertical scrollbar.
     * Accepted values: 'auto', 'visible', 'hidden'.
     * Defaults to 'auto'.
     */
    vertical?: string;
    /**
     * Render horizontal scrollbar.
     * Accepted values: 'auto', 'visible', 'hidden'.
     * Defaults to 'auto'.
     */
    horizontal?: string;
    /**
     * Cast horizontal and vertical shadows when the content is scrolled.
     * Defaults to true.
     */
    useShadows?: boolean;
    /**
     * Render arrows at the top and bottom of the vertical scrollbar.
     * Defaults to false.
     */
    verticalHasArrows?: boolean;
    /**
     * Render arrows at the left and right of the horizontal scrollbar.
     * Defaults to false.
     */
    horizontalHasArrows?: boolean;
    /**
     * Listen to mouse wheel events and react to them by scrolling.
     * Defaults to true.
     */
    handleMouseWheel?: boolean;
    /**
     * Height in pixels for the horizontal scrollbar.
     * Defaults to 10 (px).
     */
    horizontalScrollbarSize?: number;
    /**
     * Width in pixels for the vertical scrollbar.
     * Defaults to 10 (px).
     */
    verticalScrollbarSize?: number;
    /**
     * Width in pixels for the vertical slider.
     * Defaults to `verticalScrollbarSize`.
     */
    verticalSliderSize?: number;
    /**
     * Height in pixels for the horizontal slider.
     * Defaults to `horizontalScrollbarSize`.
     */
    horizontalSliderSize?: number;
}
