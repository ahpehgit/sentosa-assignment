
module.exports = (SampleRepository) => {

    const Execute = async () => {
        SampleRepository.add();
        
        return 'Calling sample';
    }

    return {
        Execute
    };
}