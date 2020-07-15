<?php
/**
 * Class Block
 *
 * @package MachineLearning
 */

namespace MachineLearning;

/**
 * Class Block
 *
 * @package MachineLearning
 */
class Block {

	/**
	 * The name of the block.
	 *
	 * @var string
	 */
	const BLOCK_NAME = 'machine-learning/question';

	/**
	 * The plugin.
	 *
	 * @var Plugin
	 */
	public $plugin;

	/**
	 * The instance ID of the block.
	 *
	 * @var int
	 */
	public static $instance_id = 0;

	/**
	 * Block constructor.
	 *
	 * @param Plugin $plugin The instance of the plugin.
	 */
	public function __construct( $plugin ) {
		$this->plugin = $plugin;
	}

	/**
	 * Inits the class.
	 */
	public function init() {
		add_action( 'init', [ $this, 'register_block' ] );
	}

	/**
	 * Registers the block as a dynamic block, with a render_callback.
	 */
	public function register_block() {
		if ( function_exists( 'register_block_type' ) ) {
			register_block_type(
				self::BLOCK_NAME,
				[
					'attributes'      => [
						'category'   => [
							'type' => 'string',
						],
						'className'  => [
							'type' => 'string',
						],
						'textSource' => [
							'type' => 'string',
						],
					],
					'render_callback' => [ $this, 'render_block' ],
				]
			);
		}
	}

	/**
	 * Gets the markup of the dynamic 'AR Viewer' block, including its scripts.
	 *
	 * @param array $attributes The block attributes.
	 * @return string The markup of the block.
	 */
	public function render_block( $attributes ) {
		self::$instance_id++;
		$post                 = get_post();
		$attributes['postId'] = $post->ID;

		$this->plugin->components->Asset->enqueue_script( Asset::FRONT_END_SCRIPT_SLUG );
		wp_add_inline_script(
			$this->plugin->components->Asset->get_prefixed_slug( Asset::FRONT_END_SCRIPT_SLUG ),
			$this->get_inline_script( $attributes ),
			'before'
		);

		ob_start();
		?>
		<div class="machine-learning-block" data-block-instance="<?php echo esc_attr( self::$instance_id ); ?>"></div>
		<?php

		return ob_get_clean();
	}

	/**
	 * Gets the inline script for the block attributes.
	 *
	 * @param array $props The props to add to the variable.
	 * @return string The inline script.
	 */
	private function get_inline_script( $props ) {
		ob_start();
		?>
		if ( 'undefined' === typeof machineLearningProps ) {
			var machineLearningProps = {};
		}

		machineLearningProps[ <?php echo esc_js( self::$instance_id ); ?> ] = <?php echo wp_json_encode( $props ); ?>;
		<?php
		return ob_get_clean();
	}
}
