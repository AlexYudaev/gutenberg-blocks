/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function Save(props) {

    const {attributes : {videoId, videoShape, videoShapeColor}} = props;
    
    const {className, ...blockProps} = useBlockProps.save({
        className : "hero-video"
    });

	return (
        <section className={className} { ...blockProps }>
			<div className="iframe-wrapper">
				<iframe 
					width="560" height="315" 
					src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1&loop=1&controls=0&playlist=${videoId}&rel=0`}
					title="YouTube video player" 
					frameborder="0" 
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
					allowfullscreen
					></iframe> 
                {	
                    videoShape &&
                    <div className="iframe-shape" style={{backgroundColor:videoShapeColor} }></div>
                }
			</div>
		</section>
	);
}
