namespace Famoser.GithubLoCCounter.Busines.Services.Interfaces
{
    public interface IProgressService
    {
        void SetMaxProgress(int max);
        void IncrementValue();
        void SetValueToZero();
    }
}
