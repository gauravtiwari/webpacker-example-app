require "application_system_test_case"

class HomesTest < ApplicationSystemTestCase
  test "can see the welcome page" do
    visit root_url
    assert_selector "h1", text: "Counter (vanilla js)"
  end

  test "can see the hello message" do
    visit root_url
    assert_selector "h5", text: "Hello! David"
  end
end
