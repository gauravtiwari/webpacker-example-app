require 'test_helper'

class HomeTest < ActionDispatch::IntegrationTest
  test "can see the welcome page" do
    get root_url
    assert_select "h1", "Counter (vanilla js)"
  end
end
