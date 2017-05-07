require "webpacker/test_helper"
require 'test_helper'

class HomeTest < ActionDispatch::IntegrationTest
  include Webpacker::TestHelper
  test "can see the welcome page" do
    get root_url
    assert_select "h1", "Counter (vanilla js)"
  end
end
