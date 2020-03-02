<?php
/**
 * Tests for class Block.
 *
 * @package EasySurvey
 */

namespace EasySurvey;

use WP_Mock;
use Mockery;

/**
 * Tests for class Block.
 */
class TestBlock extends TestCase {

	/**
	 * Instance of Block.
	 *
	 * @var Block
	 */
	public $instance;

	/**
	 * Setup.
	 *
	 * @inheritdoc
	 */
	public function setUp() : void {
		parent::setUp();
		$plugin = new Plugin( dirname( dirname( __FILE__ ) ) );
		$plugin->init();
		$this->instance = new Block( $plugin );
	}

	/**
	 * Test __construct().
	 *
	 * @covers \EasySurvey\Block::__construct()
	 */
	public function test_construct() {
		$this->assertEquals( __NAMESPACE__ . '\\Plugin', get_class( $this->instance->plugin ) );
	}

	/**
	 * Test init().
	 *
	 * @covers \EasySurvey\Block::init()
	 */
	public function test_init() {
		WP_Mock::expectActionAdded( 'init', [ $this->instance, 'register_block' ] );
		$this->instance->init();
	}

	/**
	 * Test register_block.
	 *
	 * @covers \EasySurvey\Block::register_block()
	 */
	public function test_register_block() {
		WP_Mock::userFunction( 'register_block_type' )
			->once()
			->with( Block::BLOCK_NAME, Mockery::type( 'array' ) );

		$this->instance->register_block();
	}

	/**
	 * Test render_block.
	 *
	 * @covers \EasySurvey\Block::render_block()
	 */
	public function test_render_block() {
		WP_Mock::userFunction( 'wp_enqueue_script' )
			->once();
		WP_Mock::userFunction( 'wp_json_encode' )
			->once();
		WP_Mock::userFunction( 'wp_add_inline_script' )
			->once();

		$actual = $this->instance->render_block( [] );

		$this->assertStringContainsString( '<div class="easy-survey-block" data-block-instance=', $actual );
	}
}
