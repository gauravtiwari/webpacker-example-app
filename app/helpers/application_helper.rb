module ApplicationHelper
  def stylesheet_pack_tag(name, **options)
    stylesheet_link_tag(path(name), **options)
  end

  private

  def path(name)
    if config[:dev_server_host].present?
      "#{config[:dev_server_host]}/#{name}.css"
    elsif config[:digesting]
      File.join(dist_path, digested_filename)
    else
      File.join(dist_path, "#{name}.css")
    end
  end

  def config
    Rails.configuration.x.webpacker
  end

  def digested_filename
    Webpacker::Digests.lookup(name)
  end

  def dist_path
    config[:packs_dist_path]
  end
end
