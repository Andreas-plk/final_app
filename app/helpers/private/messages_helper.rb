module Private::MessagesHelper
    include Shared::MessagesHelper
    
    def private_message_date_check(message, previous_message)
        if defined?(previous_message) && previous_message.present? 
          # if messages are not created at the same day
          if previous_message.created_at.to_date != message.created_at.to_date
            @message = message
            'private/messages/message/new_date'
          else
            'shared/empty_partial'
          end 
        else
          'shared/empty_partial'
        end 
      end

      def replace_link_to_private_messages_partial_path
        'private/messages/load_more_messages/window/replace_link_to_messages'
      end

      def sent_or_received(message, user)
        user.id == message.user_id ? 'message-sent' : 'message-received'
      end
      
      def seen_or_unseen(message)
        message.seen == false ? 'unseen' : ''
      end
end