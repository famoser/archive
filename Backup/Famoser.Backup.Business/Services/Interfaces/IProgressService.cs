namespace Famoser.Backup.Business.Services.Interfaces
{
    public interface IProgressService
    {
        void SetMaxProgress(int max);
        void IncrementValue();
        void SetValueToZero();
    }
}
