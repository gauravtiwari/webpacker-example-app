require 'webpack/source'

module ApplicationHelper
  class ManifestError < StandardError; end
  def asset_pack_tag(filename, **options)
    name, extension = filename.split('.')

    if extension.nil?
      raise StandardError.new("Specify asset type. \
        For example, rails.png or rails.js"
      )
    end

    unless allowed_extensions.include?(extension)
      raise StandardError.new("Invalid asset type. Supported formats are \
        #{allowed_extensions.to_sentence}"
      )
    end

    case extension
    when 'js'
      javascript_include_tag(Webpack::Source.new(filename).path, **options)
    when 'css'
      stylesheet_link_tag(Webpack::Source.new(filename).path, **options)
    when 'png', 'jpeg', 'JPEG', 'gif', 'svg', 'TIFF', 'tiff' 'bmp'
      image_tag(Webpack::Source.new(filename).path, **options)
    end
  end

  def allowed_extensions
    ['js', 'css', 'png', 'jpeg', 'JPEG', 'gif', 'svg', 'TIFF', 'tiff', 'bmp'].freeze
  end
end
