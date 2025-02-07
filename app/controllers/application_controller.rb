class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  before_action :opened_conversations_windows
  def redirect_if_not_signed_in
    redirect_to root_path if !user_signed_in?
  end
  
  def redirect_if_signed_in
    redirect_to root_path if user_signed_in?
  end
  private
    def opened_conversations_windows
      gon.last_visible_chat_window = nil
      gon.hidden_chats = nil
      if user_signed_in?
        # opened conversations
        session[:private_conversations] ||= []
        @private_conversations_windows = Private::Conversation.includes(:recipient, :messages)
        .where("sender_id = ?",  current_user.id)

      else
        @private_conversations_windows = [] 
      end
    end

end
