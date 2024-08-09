/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPicker, TextControl, ToggleControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit(props) {
	const {attributes, setAttributes} = props;

	// Extract classes with costom class
	const {className, ...blockProps} = useBlockProps({
		className : "hero-video"
	});


	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Block Setting', 'first-block' ) }>
					<TextControl
						label="Video ID"
						value={ attributes.videoId }
						onChange={ ( value ) => { 
							setAttributes({
								videoId: value, 
								videoImage : `https://img.youtube.com/vi/${value}/hqdefault.jpg`
								}) 
							}
						}
					/>
					<ToggleControl
						label={ __( 'Use Shaddow', 'first-block' ) }
						checked={ attributes.videoShape }
						onChange={ value => setAttributes( {videoShape: !attributes.videoShape})}
					/>
					{
						attributes.videoShape &&
						<ColorPicker
							color={attributes.videoShapeColor}
							onChange={ value => setAttributes( {videoShapeColor: value})}
							enableAlpha
							copyFormat="hex"
						/>
					}
				</PanelBody>
			</InspectorControls>
			<section className={className} { ...blockProps }>
				<div className="iframe-wrapper">
					{	
						attributes.videoShape &&
						<div className="iframe-shape" style={{backgroundColor:attributes.videoShapeColor} }></div>
					}
					<img src={attributes.videoImage} width="560" height="315" />
				</div>
			</section>
		</>

	);
}
