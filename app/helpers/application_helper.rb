module ApplicationHelper
  def react_component(name, props = {}, options = {}, &block)
    pack = Rails.root.join(File.join(Webpacker.config.public_path, Webpacker.manifest.lookup("#{name}.js"))).read
    renderer = ServerRender.new(code: pack)
    renderer.render(name.camelize, props)
  end
end
