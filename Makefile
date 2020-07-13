STACK_NAME := upgrade-sale-truck-month-2020-1

deploy-stack:
	aws cloudformation deploy \
		--template-file .aws/cloudformation-stack.yaml \
		--stack-name $(STACK_NAME) \
		--capabilities=CAPABILITY_NAMED_IAM \
		--no-fail-on-empty-changeset
