
import { useState } from 'react';
import { Calendar, FileText, Edit2, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Document {
  id: string;
  name: string;
  expiryDate: string;
  status: 'valid' | 'expiring' | 'expired';
}

const DocumentManager = () => {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'license',
      name: 'Driving License',
      expiryDate: '2025-06-15',
      status: 'valid'
    },
    {
      id: 'bluebook',
      name: 'Vehicle Bluebook',
      expiryDate: '2025-08-20',
      status: 'valid'
    },
    {
      id: 'insurance',
      name: 'Vehicle Insurance',
      expiryDate: '2025-03-10',
      status: 'expiring'
    }
  ]);
  const [tempDate, setTempDate] = useState('');

  const calculateStatus = (expiryDate: string): 'valid' | 'expiring' | 'expired' => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffInDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 0) return 'expired';
    if (diffInDays <= 90) return 'expiring';
    return 'valid';
  };

  const handleEditStart = (doc: Document) => {
    setEditingId(doc.id);
    setTempDate(doc.expiryDate);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setTempDate('');
  };

  const handleEditSave = (id: string) => {
    if (!tempDate) {
      toast({
        title: "Invalid Date",
        description: "Please select a valid expiry date.",
        variant: "destructive"
      });
      return;
    }

    const newStatus = calculateStatus(tempDate);
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === id
          ? { ...doc, expiryDate: tempDate, status: newStatus }
          : doc
      )
    );

    toast({
      title: "Date Updated",
      description: "Document expiry date has been updated successfully.",
    });

    setEditingId(null);
    setTempDate('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'expiring':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string, expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffInDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    switch (status) {
      case 'valid':
        return `Expires in ${diffInDays} days`;
      case 'expiring':
        return diffInDays > 0 ? `Expires in ${diffInDays} days` : `Expires today`;
      case 'expired':
        return `Expired ${Math.abs(diffInDays)} days ago`;
      default:
        return 'Unknown status';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="pb-20">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Document Management</h2>
        </div>

        <div className="space-y-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="relative">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-foreground">{doc.name}</span>
                  </div>
                  {editingId !== doc.id && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditStart(doc)}
                      className="h-8 w-8"
                      aria-label={`Edit ${doc.name} expiry date`}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {editingId === doc.id ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor={`expiry-${doc.id}`}>Expiry Date</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="relative flex-1">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id={`expiry-${doc.id}`}
                            type="date"
                            value={tempDate}
                            onChange={(e) => setTempDate(e.target.value)}
                            min={getMinDate()}
                            className="pl-10"
                          />
                        </div>
                        <Button
                          size="icon"
                          onClick={() => handleEditSave(doc.id)}
                          className="h-10 w-10"
                          aria-label="Save changes"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleEditCancel}
                          className="h-10 w-10"
                          aria-label="Cancel editing"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Expiry Date:</span>
                      <span className="text-sm text-foreground">{formatDate(doc.expiryDate)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Status:</span>
                      <Badge 
                        className={getStatusColor(doc.status)}
                        variant="outline"
                      >
                        {getStatusText(doc.status, doc.expiryDate)}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-black">Keep Your Documents Updated</h3>
                <p className="text-sm text-black mt-1">
                  Regularly update your document expiry dates to receive timely renewal reminders and avoid any legal issues.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentManager;
