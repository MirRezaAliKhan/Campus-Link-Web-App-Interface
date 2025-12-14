import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { CheckCircle2 } from 'lucide-react';

interface JobApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  company: string;
  position: string;
  onSubmit: () => void;
}

export function JobApplicationDialog({ open, onOpenChange, company, position, onSubmit }: JobApplicationDialogProps) {
  const [submitted, setSubmitted] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [portfolio, setPortfolio] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSubmit();
      setSubmitted(false);
      setCoverLetter('');
      setPortfolio('');
      onOpenChange(false);
    }, 2000);
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md text-center">
          <div className="py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">Application Submitted!</h3>
            <p className="text-gray-600">
              Your application to {company} for {position} has been successfully submitted.
              You'll receive updates via email.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply to {company}</DialogTitle>
          <DialogDescription>
            Position: {position}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-gray-700">
                Your profile information (education, skills, achievements) will be automatically included.
              </p>
            </div>
            <div>
              <Label htmlFor="coverLetter">Cover Letter</Label>
              <Textarea
                id="coverLetter"
                placeholder="Tell us why you're interested in this position..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="mt-1 min-h-[150px]"
                required
              />
            </div>
            <div>
              <Label htmlFor="portfolio">Portfolio/Resume URL</Label>
              <Input
                id="portfolio"
                type="url"
                placeholder="https://your-portfolio.com"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm text-gray-700">
                <strong>Tip:</strong> Highlight your relevant skills and experiences that match the job requirements.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Submit Application
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
