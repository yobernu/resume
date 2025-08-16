import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle } from "lucide-react";

interface CommentsModalProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
}

export default function CommentsModal({ open, onClose, projectId }: CommentsModalProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) fetchComments();
    // eslint-disable-next-line
  }, [open, projectId]);

  const fetchComments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('project_comments')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });
    if (!error && data) setComments(data);
    setLoading(false);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setSubmitting(true);
    const { error } = await supabase
      .from('project_comments')
      .insert({ project_id: projectId, content: newComment });
    setSubmitting(false);
    if (!error) {
      setNewComment("");
      fetchComments();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full rounded-2xl p-6 bg-background border border-primary/20 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            <DialogTitle className="text-xl font-bold">Project Comments</DialogTitle>
          </div>
        </DialogHeader>
        <div className="space-y-4 max-h-60 overflow-y-auto mb-4">
          {loading ? (
            <div className="text-muted-foreground">Loading comments...</div>
          ) : comments.length === 0 ? (
            <div className="text-muted-foreground">No comments yet. Be the first!</div>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="bg-muted/40 rounded-lg p-3 text-sm text-muted-foreground">
                <div>{comment.content}</div>
                <div className="text-xs text-right mt-1 opacity-60">
                  {new Date(comment.created_at).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="resize-none min-h-[60px]"
            disabled={submitting}
          />
          <Button
            onClick={handleAddComment}
            disabled={submitting || !newComment.trim()}
            className="self-end"
            variant="gradient"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 