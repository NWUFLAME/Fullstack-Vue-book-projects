new Vue({
    el: '#app',
    data: {
        submissions: Seed.submissions
    },
    computed: {
        sortedSubmissions: function() {
            return this.submissions.sort((a, b) => {
                return b.votes - a.votes
            })
        }
    },
    methods: {
        upvote: function(submissionId) {
            const submission = this.submissions.find(submission => submission.id === submissionId);
            submission.votes++;
        }
    }
});
