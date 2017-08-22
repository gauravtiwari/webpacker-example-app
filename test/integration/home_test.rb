require 'test_helper'

class HomeTest < ActionDispatch::IntegrationTest
  test "can see the hello message" do
    get '/'
    assert_select "h5", text: "Hello! David"
  end
end
