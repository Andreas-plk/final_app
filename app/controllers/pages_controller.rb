class PagesController < ApplicationController
    
    def index
        @hobby_posts = Post.by_branch('hobby').limit(9)
        @study_posts = Post.by_branch('study').limit(9)
        @team_posts = Post.by_branch('team').limit(9)
      end
end
