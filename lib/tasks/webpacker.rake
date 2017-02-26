Rake::Task['webpacker:compile'].clear

namespace :webpacker do
  desc "Compile javascript packs using webpack for production with digests"
  task :compile => :environment do
    dist_dir = Rails.application.config.x.webpacker[:packs_dist_dir]
    `WEBPACK_DIST_DIR=#{dist_dir} WEBPACK_ENV=production ./bin/webpack --json`

    exit! $?.exitstatus unless $?.success?

    digests_path = Rails.application.config.x.webpacker[:digests_path]
    packs_path = Rails.root.join('public', dist_dir) || File.dirname(digests_path)
    packs_digests_path = digests_path || Rails.root.join(packs_path, 'manifest.json')

    webpack_digests = JSON.parse(File.read(packs_digests_path))

    puts "Compiled digests for all packs in #{packs_digests_path}: "
    puts webpack_digests
  end
end
