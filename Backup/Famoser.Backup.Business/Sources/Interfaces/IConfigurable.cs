using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Famoser.Backup.Business.Sources.Interfaces
{
    interface IConfigurable
    {
        bool HasAnotherQuestion();
        string AskQuestion();
        void AnswerToQuestion(string answer);
    }
}
